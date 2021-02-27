import React from "react";
import AvatarVideo from "../AvatarVideo/AvatarVideo";

const ThankYou = ({ onEnded }) => {
  return <AvatarVideo src="https://youtu.be/ae6_O-xruAI" onEnded={onEnded} />;
};

export default ThankYou;
