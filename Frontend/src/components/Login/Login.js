import React from "react";
import { TextField } from "@material-ui/core";
import HorizontalSpacing from "../HorizontalSpacing/HorizontalSpacing";

const Login = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <p>
        <TextField value="admin-team2" />
      </p>
      <p>
        <TextField type="password" value="fie5aBo9oe4eij1faexu" />
      </p>
      <HorizontalSpacing variant="extraSmall" />
      <p>
        <a
          href="#"
          onClick={() => {
            alert("todo");
          }}
        >
          Don't have an account? Sign up!
        </a>{" "}
      </p>
      <p>
        <a
          href="#"
          onClick={() => {
            alert("todo");
          }}
        >
          Forgot Password?
        </a>
      </p>
    </div>
  );
};

export default Login;
