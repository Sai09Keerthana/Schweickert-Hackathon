import React from "react";
import AvatarVideo from "../AvatarVideo/AvatarVideo";

const ThankYou = ({ onEnded }) => {
  return (
    <AvatarVideo
      src="https://www.youtube.com/embed/ae6_O-xruAI"
      onEnded={onEnded}
    />
  );
};

export default ThankYou;
