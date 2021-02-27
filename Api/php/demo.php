<?php

/*

Ticket Creation Demo.

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

require_once 'create_ticket.php';

$url        = "https://team2-hackdays.itomig.de/webservices/rest.php?version=1.3";
$login      = 'admin-team2';
$password   = 'fie5aBo9oe4eij1faexu';

create_ticket( $url, $login, $password, "claude", "monet", "Demo", 1, "C: Cannot submit ticket", "Dear Support, can you please help? I cannot submit a ticket" );
create_ticket( $url, $login, $password, "claude", "monet", "Demo", 2, "H: Cannot submit ticket", "Dear Support, can you please help? I cannot submit a ticket" );
create_ticket( $url, $login, $password, "claude", "monet", "Demo", 3, "M: Cannot submit ticket", "Dear Support, can you please help? I cannot submit a ticket" );
create_ticket( $url, $login, $password, "claude", "monet", "Demo", 4, "L: Cannot submit ticket", "Dear Support, can you please help? I cannot submit a ticket" );
