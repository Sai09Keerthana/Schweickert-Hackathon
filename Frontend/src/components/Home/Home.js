import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Sitemap from "../Sitemap/Sitemap";

const Home = () => {
  return (
    <div>
      <h1>Welcome!</h1>

      <Link to="/login">
        <Button variant="outlined">START THE APP</Button>
      </Link>

      {/* <Sitemap /> */}
    </div>
  );
};

export default Home;
