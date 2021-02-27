<?php
// Copyright (C) 2010-2012 Combodo SARL
//
//   This file is part of iTop.
//
//   iTop is free software; you can redistribute it and/or modify	
//   it under the terms of the GNU Affero General Public License as published by
//   the Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.
//
//   iTop is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU Affero General Public License for more details.
//
//   You should have received a copy of the GNU Affero General Public License
//   along with iTop. If not, see <http://www.gnu.org/licenses/>


/**
 * Shows a usage of the SOAP queries 
 *
 * @copyright   Copyright (C) 2010-2012 Combodo SARL
 * @license     http://opensource.org/licenses/AGPL-3.0
 */

/**
 * Helper to execute an HTTP POST request
 *
 * @param $sUrl
 * @param $aData
 * @param null $sOptionnalHeaders
 * @param null $aResponseHeaders
 * @param array $aCurlOptions
 *
 * @return bool|false|string
 * @throws \Exception
 */
function DoPostRequest($sUrl, $aData, $sOptionnalHeaders = null, &$aResponseHeaders = null, $aCurlOptions = array())
{
    // $sOptionnalHeaders is a string containing additional HTTP headers that you would like to send in your request.

    if (function_exists('curl_init'))
    {
        // If cURL is available, let's use it, since it provides a greater control over the various HTTP/SSL options
        // For instance fopen does not allow to work around the bug: http://stackoverflow.com/questions/18191672/php-curl-ssl-routinesssl23-get-server-helloreason1112
        // by setting the SSLVERSION to 3 as done below.
        $aHTTPHeaders = array();
        if ($sOptionnalHeaders !== null)
        {
            $aHeaders = explode("\n", $sOptionnalHeaders);
            foreach($aHeaders as $sHeaderString)
            {
                if(preg_match('/^([^:]): (.+)$/', $sHeaderString, $aMatches))
                {
                    $aHTTPHeaders[$aMatches[1]] = $aMatches[2];
                }
            }
        }
        // Default options, can be overloaded/extended with the 4th parameter of this method, see above $aCurlOptions
        $aOptions = array(
            CURLOPT_RETURNTRANSFER	=> true,     // return the content of the request
            CURLOPT_HEADER			=> false,    // don't return the headers in the output
            CURLOPT_FOLLOWLOCATION	=> true,     // follow redirects
            CURLOPT_ENCODING		=> "",       // handle all encodings
            CURLOPT_USERAGENT		=> "spider", // who am i
            CURLOPT_AUTOREFERER		=> true,     // set referer on redirect
            CURLOPT_CONNECTTIMEOUT	=> 120,      // timeout on connect
            CURLOPT_TIMEOUT			=> 120,      // timeout on response
            CURLOPT_MAXREDIRS		=> 10,       // stop after 10 redirects
            CURLOPT_SSL_VERIFYHOST	=> 0,   	 // Disabled SSL Cert checks
            CURLOPT_SSL_VERIFYPEER	=> 0,   	 // Disabled SSL Cert checks
            // SSLV3 (CURL_SSLVERSION_SSLv3 = 3) is now considered as obsolete/dangerous: http://disablessl3.com/#why
            // but it used to be a MUST to prevent a strange SSL error: http://stackoverflow.com/questions/18191672/php-curl-ssl-routinesssl23-get-server-helloreason1112
            // CURLOPT_SSLVERSION		=> 3,
            CURLOPT_POST			=> count($aData),
            CURLOPT_POSTFIELDS		=> http_build_query($aData),
            CURLOPT_HTTPHEADER		=> $aHTTPHeaders,
        );
        $aAllOptions = $aCurlOptions + $aOptions;
        $ch = curl_init($sUrl);
        curl_setopt_array($ch, $aAllOptions);
        $response = curl_exec($ch);
        $iErr = curl_errno($ch);
        $sErrMsg = curl_error( $ch );
        if ($iErr !== 0)
        {
            throw new Exception("Problem opening URL: $sUrl, $sErrMsg");
        }
        if (is_array($aResponseHeaders))
        {
            $aHeaders = curl_getinfo($ch);
            foreach($aHeaders as $sCode => $sValue)
            {
                $sName = str_replace(' ' , '-', ucwords(str_replace('_', ' ', $sCode))); // Transform "content_type" into "Content-Type"
                $aResponseHeaders[$sName] = $sValue;
            }
        }
        curl_close( $ch );
    }
    else
    {
        // cURL is not available let's try with streams and fopen...

        $sData = http_build_query($aData);
        $aParams = array('http' => array(
            'method' => 'POST',
            'content' => $sData,
            'header'=> "Content-type: application/x-www-form-urlencoded\r\nContent-Length: ".strlen($sData)."\r\n",
        ));
        if ($sOptionnalHeaders !== null)
        {
            $aParams['http']['header'] .= $sOptionnalHeaders;
        }
        $ctx = stream_context_create($aParams);

        $fp = @fopen($sUrl, 'rb', false, $ctx);
        if (!$fp)
        {
            global $php_errormsg;
            if (isset($php_errormsg))
            {
                throw new Exception("Wrong URL: $sUrl, $php_errormsg");
            }
            elseif ((strtolower(substr($sUrl, 0, 5)) == 'https') && !extension_loaded('openssl'))
            {
                throw new Exception("Cannot connect to $sUrl: missing module 'openssl'");
            }
            else
            {
                throw new Exception("Wrong URL: $sUrl");
            }
        }
        $response = @stream_get_contents($fp);
        if ($response === false)
        {
            throw new Exception("Problem reading data from $sUrl, $php_errormsg");
        }
        if (is_array($aResponseHeaders))
        {
            $aMeta = stream_get_meta_data($fp);
            $aHeaders = $aMeta['wrapper_data'];
            foreach($aHeaders as $sHeaderString)
            {
                if(preg_match('/^([^:]+): (.+)$/', $sHeaderString, $aMatches))
                {
                    $aResponseHeaders[$aMatches[1]] = trim($aMatches[2]);
                }
            }
        }
    }
    return $response;
}
