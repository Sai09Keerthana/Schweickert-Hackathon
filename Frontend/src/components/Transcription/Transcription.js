import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { BiMailSend } from "react-icons/bi";
import { post } from "axios";

const Transcription = ({
  setTicketText,
  onModified,
  firstname,
  lastname,
  organization,
  setCreatedTicketId,
  setCreatedTicketNr,
}) => {
  const [textFromAwsTranscribe, setTextFromAwsTranscribe] = useState(
    "My PC suddenly shut down!" //TODO: get from AWS transcribe
  );

  const submitTicket = async () => {
    const submitTicketEndpointUrl = `${process.env.REACT_APP_AWS_API_GATEWAY}/ticket`;

    let response;

    const randomNumber = Math.floor(Math.random() * 10);

    const shortenedTiketText = `(Rnd${randomNumber}) ${textFromAwsTranscribe.substring(
      0,
      15
    )}`;

    try {
      response = await post(submitTicketEndpointUrl, {
        user_firstname: firstname,
        user_lastname: lastname,
        organization: organization,
        ticket_body: textFromAwsTranscribe,
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
  };

  return (
    <div>
      <h1>Transcription</h1>
      <p>
        Ticket Description:
        <TextField
          multiline={true}
          variant="outlined"
          value={textFromAwsTranscribe}
          onChange={(e) => setTextFromAwsTranscribe(e.target.value)}
        />
      </p>
      <p>
        <Button
          onClick={async () => {
            setTicketText(textFromAwsTranscribe);
            await submitTicket();
            onModified();
          }}
          variant="outlined"
        >
          <BiMailSend size={30} />
          Submit Ticket
        </Button>
      </p>
    </div>
  );
};

export default Transcription;
