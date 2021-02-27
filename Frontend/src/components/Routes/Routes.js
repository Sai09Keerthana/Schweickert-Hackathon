import React from "react";
import Login from "../Login/Login";
import Home from "../Home/Home";
import Intro from "../Intro/Intro";
import SpeakTicket from "../SpeakTicket/SpeakTicket";
import Transcription from "../Transcription/Transcription";
import TicketPreview from "../TicketPreview/TicketPreview";
import ThankYou from "../ThankYou/ThankYou";
import MyTickets from "../MyTickets/MyTickets";
import NextButton from "../NextButton/NextButton";
import { Route, Switch, useHistory } from "react-router-dom";
import LayoutBasic from "../LayoutBasic/LayoutBasic";

const Routes = () => {
  const history = useHistory();

  return (
    <Switch>
      <LayoutBasic>
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
          <SpeakTicket />
          {/* <NextButton to={"/transcription"} label={"Next"} /> */}
        </Route>
        <Route path="/transcription">
          <Transcription />
          <NextButton to={"/ticket-preview"} label={"Next"} />
        </Route>
        <Route path="/ticket-preview">
          <TicketPreview />
          <NextButton to={"/thank-you"} label={"Next"} />
        </Route>
        <Route path="/thank-you">
          <ThankYou
            onEnded={() => {
              history.push("/my-tickets");
            }}
          />
        </Route>
        <Route path="/my-tickets">
          <MyTickets />
          <NextButton to={"/"} label={"Exit"} />
        </Route>
      </LayoutBasic>
    </Switch>
  );
};

export default Routes;
