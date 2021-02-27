import React from "react";

const HorizontalSpacing = ({ variant }) => {
  switch (variant) {
    case "extraSmall":
      return <div style={{ padding: "8px" }}></div>;
      break;
    case "small":
      return <div style={{ padding: "13px" }}></div>;
      break;
    case "medium":
      return <div style={{ padding: "21px" }}></div>;
      break;
    case "large":
      return <div style={{ padding: "34px" }}></div>;
      break;

    default:
      return <div style={{ padding: "21px" }}></div>;
      break;
  }
};

export default HorizontalSpacing;
