import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { BiMailSend } from "react-icons/bi";

const Transcription = ({ setTicketText, onModified }) => {
  const [textFromAwsTranscribe, setTextFromAwsTranscribe] = useState(
    "My PC did not turn on!" //TODO: get from AWS transcribe
  );

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
          onClick={() => {
            setTicketText(textFromAwsTranscribe);
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
