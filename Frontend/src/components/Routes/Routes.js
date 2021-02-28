import React, { useState } from "react";
import Login from "../Login/Login";
import Home from "../Home/Home";
import Intro from "../Intro/Intro";
import SpeakTicket from "../SpeakTicket/SpeakTicket";
import Transcription from "../Transcription/Transcription";
import ThankYou from "../ThankYou/ThankYou";
import MyTickets from "../MyTickets/MyTickets";
import NextButton from "../NextButton/NextButton";
import { Route, Switch, useHistory } from "react-router-dom";
import LayoutPhoneSimulator from "../Layout/LayoutPhoneSimulator";
import AttachFileIntro from "../AttachFileIntro/AttachFileIntro";
import AttachFileNow from "../AttachFileNow/AttachFileNow";
import TicketPreviewIntro from "../TicketPreviewIntro/TicketPreviewIntro";
import Sitemap from "../Sitemap/Sitemap";

const Routes = () => {
  const history = useHistory();

  const [createdTicketId, setCreatedTicketId] = useState("R-666");
  const [createdTicketNr, setCreatedTicketNr] = useState("6");

  const [firstname, setFirstname] = useState("claude");
  const [lastname, setLastname] = useState("monet");
  const [organization, setOrganization] = useState("Demo");

  const [ticketText, setTicketText] = useState("My PC did not turn on.");

  const [hasFile, setHasFile] = useState(false);

  return (
    <Switch>
      <LayoutPhoneSimulator>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/login">
          <Login nextButtonLabel="Login" />
          <NextButton to={"/intro"} label={"Login"} />
        </Route>
        <Route path="/intro">
          <Intro
            onEnded={() => {
              history.push("/speak-ticket");
            }}
          />
        </Route>
        <Route path="/speak-ticket">
          <SpeakTicket to={"/transcription"} />
          {/* <NextButton to={"/transcription"} label={"Next"} /> */}
        </Route>
        <Route path="/transcription">
          <Transcription
            setTicketText={setTicketText}
            onModified={() => {
              history.push("/attach-file-intro");
            }}
            firstname={firstname}
            lastname={lastname}
            organization={organization}
            setCreatedTicketId={setCreatedTicketId}
            setCreatedTicketNr={setCreatedTicketNr}
          />
          {/* <NextButton to={"/attach-file-intro"} label={"Next"} /> */}
        </Route>
        {/* <Route path="/ticket-preview">
          <TicketPreview
            setCreatedTicketId={setCreatedTicketId}
            setCreatedTicketNr={setCreatedTicketNr}
            ticketText={ticketText}
            firstname={firstname}
            lastname={lastname}
            organization={organization}
            nextButtonLabel={"Submit Ticket"}
            to={"attach-file-intro"}
          />
        </Route> */}
        <Route path="/attach-file-intro" exact={true}>
          <AttachFileIntro
            onEnded={() => {
              history.push("/attach-file");
            }}
          />
        </Route>
        <Route path="/attach-file">
          <AttachFileNow setHasFile={setHasFile} />
          <NextButton
            to={hasFile ? "/thank-you-with-file" : "/thank-you"}
            label={"Next"}
          />
        </Route>
        <Route path="/thank-you-with-file" exact={true}>
          <TicketPreviewIntro
            onEnded={() => {
              history.push("/my-tickets");
            }}
          />
        </Route>
        <Route path="/thank-you">
          <ThankYou
            onEnded={() => {
              history.push("/my-tickets");
            }}
          />
        </Route>
        <Route path="/my-tickets">
          <MyTickets
            createdTicketId={createdTicketId}
            createdTicketNr={createdTicketNr}
          />
          <NextButton to={"/"} label={"Exit"} />
        </Route>

        <Route path="/sitemap">
          <Sitemap />
        </Route>
      </LayoutPhoneSimulator>
    </Switch>
  );
};

export default Routes;
