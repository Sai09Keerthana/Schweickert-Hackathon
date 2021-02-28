import { Button } from "@material-ui/core";
import React from "react";
import { post } from "axios";
import { useHistory } from "react-router-dom";

const TicketPreview = ({
  setCreatedTicketId,
  setCreatedTicketNr,
  ticketText,
  firstname,
  lastname,
  organization,
  nextButtonLabel,
  to,
}) => {
  const history = useHistory();

  const handleClickSubmit = async () => {
    const submitTicketEndpointUrl = `${process.env.REACT_APP_AWS_API_GATEWAY}/ticket`;

    let response;

    const randomNumber = Math.floor(Math.random() * 10);

    const shortenedTiketText = `(Rnd${randomNumber}) ${ticketText.substring(
      0,
      15
    )}`;

    try {
      response = await post(submitTicketEndpointUrl, {
        user_firstname: firstname,
        user_lastname: lastname,
        organization: organization,
        ticket_body: ticketText,
        ticket_subject: shortenedTiketText,
        urgency: "low", //or high
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

    history.push(to);
  };

  return (
    <div>
      <h1>Ticket Preview</h1>
      <p>{ticketText}</p>
      <Button variant="outlined" onClick={handleClickSubmit}>
        {nextButtonLabel}
      </Button>
    </div>
  );
};

export default TicketPreview;
