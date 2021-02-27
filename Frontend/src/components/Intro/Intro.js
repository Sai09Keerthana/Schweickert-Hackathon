import React from "react";
import AvatarVideo from "../AvatarVideo/AvatarVideo";

const Intro = ({ onEnded }) => {
  return (
    <AvatarVideo
      src="https://www.youtube.com/embed/Sou8W7EdDNU"
      onEnded={onEnded}
    />
  );
};

export default Intro;
