import { Card } from "@material-ui/core";
import React from "react";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import DeviceEmulator from "react-device-emulator";
import "react-device-emulator/lib/styles/style.css";

import styles from "./LayoutBasic.module.scss";
import HorizontalSpacing from "../HorizontalSpacing/HorizontalSpacing";

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
      <div className={styles.deviceWrapper}>
        <HorizontalSpacing variant="large" />
        <div className={styles.deviceWrapperInner}>
          <DeviceEmulator type="mobile">
            <Card variant="outlined">
              <div className={styles.frame}>{children}</div>
            </Card>
          </DeviceEmulator>
        </div>
      </div>
      {/* </Container> */}
    </>
  );
};
export default LayoutBasic;
