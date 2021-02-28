import React from "react";
import AvatarVideo from "../AvatarVideo/AvatarVideo";

const AttachFileIntro = ({ onEnded }) => {
  return (
    <AvatarVideo
      src="https://www.youtube.com/embed/tnbrG-XHVXA"
      onEnded={onEnded}
    />
  );
};

export default AttachFileIntro;
