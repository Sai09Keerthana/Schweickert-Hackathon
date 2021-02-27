<?php

/*

Create Ticket wrapper.

Copyright (C) 2021 Hack Rhein-Neckar - Schweickert Team 2

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.

*/

require_once 'DoPostRequest.php';

function create_ticket( $url, $login, $password, $user_firstname, $user_lastname, $organization, $subject, $body )
{
    $aData = array();
    $aData['auth_user'] = $login;
    $aData['auth_pwd']  = $password;

    $aOperation = array(
        'operation'     => 'core/create', // operation code
        'comment'       => 'Synchronization from blah...', // comment recorded in the change tracking log
        'class'         => 'UserRequest',
        'output_fields' => 'id, friendlyname', // list of fields to show in the results (* or a,b,c)
        // Values for the object to create
        'fields' => array(
            'org_id' => "SELECT Organization WHERE name = '$organization'",
            'caller_id'     => array('name' => "$user_lastname", 'first_name' => "$user_firstname"),
            'title'         => "$subject",
            'description'   => "$body"
        ),
    );

    $aData['json_data'] = json_encode($aOperation);

    #echo "--------------------------------------\n";
    #echo "Input:\n";
    #print_r($aOperation);
    $aResults = null;
    try
    {
        $response = DoPostRequest($url, $aData);
        $aResults = json_decode($response);
    }
    catch (Exception $e)
    {
        $response = $e->getMessage();
    }
    if ($aResults)
    {
        echo "--------------------------------------\n";
        echo "Reply:\n";
        print_r($aResults);
    }
    else
    {
        echo "ERROR rest.php replied:\n";
        echo $response;
    }
}
