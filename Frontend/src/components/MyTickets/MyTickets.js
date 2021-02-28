import { Button } from "@material-ui/core";
import React from "react";

const MyTickets = ({ createdTicketId, createdTicketNr }) => {
  const ticketUrl = process.env.REACT_APP_ITOP_REPLACEABLE_TICKET_DETAILS_URL.replace(
    "[TICKETID]",
    createdTicketId
  );

  return (
    <div>
      <a href={ticketUrl} rel="noopener noreferrer" target="_blank">
        <Button variant="outlined">
          Open just created Ticket
          <br />
          {createdTicketNr} ({createdTicketId})
        </Button>
      </a>

      <h1>My Tickets</h1>
      <p>Body</p>
    </div>
  );
};

export default MyTickets;
