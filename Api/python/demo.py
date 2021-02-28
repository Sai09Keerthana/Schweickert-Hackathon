#!/usr/bin/python

# Create Ticket Demo.
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


import helpers
import helpers_schw

organization = "Demo"
user_lastname = "monet"
user_firstname = "claude"
urgency = helpers.URGENCY_HIGH

helpers_schw.create_ticket( user_firstname, user_lastname, organization, urgency, "something wrong", "please help from Python" )
helpers_schw.create_ticket( "frida", "kahlo", organization, helpers.URGENCY_LOW, "something wrong", "please help from Python" )