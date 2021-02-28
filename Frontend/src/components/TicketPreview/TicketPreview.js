import { Button } from "@material-ui/core";
import React from "react";
import { post } from "axios";
import { useHistory } from "react-router-dom";

const TicketPreview = ({
  setCreatedTicketId,
  setCreatedTicketNr,
  ticketText,
}) => {
  const history = useHistory();

  const handleClickSubmit = async () => {
    const submitTicketEndpointUrl = `${process.env.REACT_APP_AWS_API_GATEWAY}/ticket`;

    let response;

    try {
      response = await post(submitTicketEndpointUrl, {
        // firstname: "frontend_firstname",
        // lastname: "frontend_lastname",
        // organization: "frontend_organization",
        // urgency: "low",
      });

      const { ticket_nr, id, ticketOk, code } = response.data;

      if (ticketOk) {
        setCreatedTicketId(id);
        setCreatedTicketNr(ticket_nr);
      } else {
        alert(
          `Ticket was not created. API returned an unexpected code ${code}.`
        );
      }
    } catch (e) {
      console.log(e);
      alert("sorry could not contact the API :/");
    }

    history.push("/thank-you");
  };

  return (
    <div>
      <h1>Ticket Preview</h1>
      <p>{ticketText}</p>
      <Button variant="outlined" onClick={handleClickSubmit}>
        Submit Ticket
      </Button>
    </div>
  );
};

export default TicketPreview;
