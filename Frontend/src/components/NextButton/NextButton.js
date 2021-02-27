import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const NextButton = ({ to, label }) => {
  return (
    <Link to={to}>
      <Button variant="outlined">{label}</Button>
    </Link>
  );
};

export default NextButton;
