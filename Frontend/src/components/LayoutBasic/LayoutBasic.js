import { Card } from "@material-ui/core";
import React from "react";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

import styles from "./LayoutBasic.module.scss";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
theme = responsiveFontSizes(theme);

const LayoutBasic = ({ children }) => {
  return (
    <>
      {/* <HorizontalSpacing /> */}
      {/* <Container> */}
      <Card variant="outlined">
        <div className={styles.frame}>{children}</div>
      </Card>
      {/* </Container> */}
    </>
  );
};
export default LayoutBasic;
