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


import requests
import json
import sys
#from pprint import pprint # DEBUG

ITOP_URL        = "https://team2-hackdays.itomig.de"
ITOP_USER       = 'admin-team2'
ITOP_PWD        = 'fie5aBo9oe4eij1faexu'
TICKET_CLASS    = 'UserRequest'
COMMENT         = 'Created from Python'

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
    r = requests.post(ITOP_URL+'/webservices/rest.php?version=1.3', verify=False, data={'auth_user': ITOP_USER , 'auth_pwd': ITOP_PWD , 'json_data': encoded_data})
    result = json.loads(r.text);

    if result['code'] == 0:
        # pprint( result['objects'] ) # DEBUG
        objects = result['objects']
        first_key = next(iter( objects ))  # outputs 'foo'
        res = objects[ first_key ]
        # pprint( res ) # DEBUG
        fields = res['fields']
        tick_id = fields['id']
        tick_friendly_id = fields['friendlyname']
        print( "Ticket created - %(friendly)s (%(id)s).\n" % { 'id' : tick_id, 'friendly' : tick_friendly_id  } )
    else:
        print( result['message']+"\n" )

organization = "Demo"
user_lastname = "monet"
user_firstname = "claude"
urgency = 1

create_ticket( ITOP_URL, ITOP_USER, ITOP_PWD, user_firstname, user_lastname, organization, urgency, "something wrong", "please help from Python" )
