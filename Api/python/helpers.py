#!/usr/bin/python

# Create Ticket wrapper.
#
# Copyright (C) 2021 Hack Rhein-Neckar - Schweickert Team 2
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# 
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.


from botocore.vendored import requests
import json
import sys
#from pprint import pprint # DEBUG

TICKET_CLASS    = 'UserRequest'
COMMENT         = 'Created from Python'

URGENCY_CRITICAL = 1
URGENCY_HIGH     = 2
URGENCY_MEDIUM   = 3
URGENCY_LOW      = 4

def create_ticket( url, login, password, user_firstname, user_lastname, organization, urgency, subject, body ):

    json_data = {
        'operation': 'core/create',
        'class': TICKET_CLASS,
        'fields': {
                'title': subject,
                'description': body,
                'org_id': 'SELECT Organization WHERE name = "%(organization)s"' % { 'organization': organization },
                'caller_id' : {
                    'name' : user_lastname,
                    'first_name' : user_firstname,
                },
                'urgency': urgency,
        },
        'comment': COMMENT,
        'output_fields': 'id, friendlyname',
}
    encoded_data = json.dumps(json_data)
    r = requests.post(url+'/webservices/rest.php?version=1.3', verify=True, data={'auth_user': login , 'auth_pwd': password , 'json_data': encoded_data})
    result = json.loads(r.text);

    res = dict()
    res['code'] = result['code']

    if result['code'] == 0:
        # pprint( result['objects'] ) # DEBUG
        objects = result['objects']
        first_key = next(iter( objects ))  # outputs 'foo'
        res_f = objects[ first_key ]
        # pprint( res ) # DEBUG
        fields = res_f['fields']
        tick_id = fields['id']
        tick_friendly_id = fields['friendlyname']

        res['id'] = tick_id
        res['ticket_nr'] = tick_friendly_id
    else:
        res['message'] = result['message']

    return res
