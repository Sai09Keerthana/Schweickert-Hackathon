import { Card } from "@material-ui/core";
import React from "react";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import HorizontalSpacing from "../HorizontalSpacing/HorizontalSpacing";
import styles from "./Layout.module.scss";
import "react-device-emulator/lib/styles/style.css";

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

const LayoutPhoneSimulator = ({ children }) => {
  return (
    <>
      {/* <HorizontalSpacing /> */}
      {/* <Container> */}
      <div className={styles.deviceWrapper}>
        <img src="/phone.png" className={styles.phoneImg} />
        <div className={`${styles.deviceWrapperInner} ${styles.insideOfPhone}`}>
          <HorizontalSpacing variant="large" />
          {/* <DeviceEmulator type="tab"> */}
          <Card variant="outlined">
            <div className={styles.frame}>{children}</div>
          </Card>
          {/* </DeviceEmulator> */}
        </div>
      </div>
      {/* </Container> */}
    </>
  );
};
export default LayoutPhoneSimulator;
