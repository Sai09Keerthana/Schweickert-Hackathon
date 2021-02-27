import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Sitemap from "../Sitemap/Sitemap";

const Home = () => {
  return (
    <div>
      <h1>Welcome! This is a Debug Screen for faster development.</h1>

      <Link to="/login">
        <Button variant="outlined">START</Button>
      </Link>

      <Sitemap />
    </div>
  );
};

export default Home;
