import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { VscDebugStart } from "react-icons/vsc";

import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div>
      <h1>Thanks for downloading the App</h1>

      <Link to="/login">
        <Button variant="outlined">
          <img src="/eva.png" className={styles.assistantImg} />
          <VscDebugStart size={40} />
          Tell Eva about your problem
        </Button>
      </Link>

      {/* <Sitemap /> */}
    </div>
  );
};

export default Home;
