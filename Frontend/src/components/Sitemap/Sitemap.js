import React from "react";
import { Link } from "react-router-dom";

const Sitemap = () => {
  return (
    <div>
      <h3>Sitemap</h3>
      <ul>
        <li>
          <Link to="/login">Go to Login</Link>
        </li>
        <li>
          <Link to="/intro">Go to Intro</Link>
        </li>
        <li>
          <Link to="/speak-ticket">Go to Speak Ticket</Link>
        </li>
        <li>
          <Link to="/transcription">Go to Transcription</Link>
        </li>
        <li>
          <Link to="/ticket-preview">Go to Ticket Preview</Link>
        </li>
        <li>
          <Link to="/thank-you">Go to Thank you!</Link>
        </li>
        <li>
          <Link to="/my-tickets">Go to My Tickets</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sitemap;
