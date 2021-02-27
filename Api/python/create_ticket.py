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

ITOP_URL        = "https://team2-hackdays.itomig.de"
ITOP_USER       = 'admin-team2'
ITOP_PWD        = 'fie5aBo9oe4eij1faexu'
TICKET_CLASS = 'UserRequest'
TITLE = 'Service down'
DESCRIPTION = 'BODY'
COMMENT = 'Created from Python'

organization = "Demo"
user_lastname = "monet"
user_firstname = "claude"
urgency = 1

json_data = {
        'operation': 'core/create',
        'class': TICKET_CLASS,
        'fields': {
                'title': TITLE,
                'description': DESCRIPTION,
                'org_id': 'SELECT Organization WHERE name = "%(organization)s"' % { 'organization': organization },
                'caller_id' : {
                    'name' : user_lastname,
                    'first_name' : user_firstname,
                },
                'urgency': urgency,
        },
        'comment': COMMENT,
        'output_fields': 'id',
}
encoded_data = json.dumps(json_data)
r = requests.post(ITOP_URL+'/webservices/rest.php?version=1.3', verify=False, data={'auth_user': ITOP_USER , 'auth_pwd': ITOP_PWD , 'json_data': encoded_data})
result = json.loads(r.text);
if result['code'] == 0:
        print( "Ticket created.\n" )
else:
        print( result['message']+"\n" )
