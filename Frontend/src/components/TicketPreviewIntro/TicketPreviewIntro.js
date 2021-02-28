import React from "react";
import AvatarVideo from "../AvatarVideo/AvatarVideo";

const TicketPreviewIntro = ({ onEnded }) => {
  return (
    <AvatarVideo
      src="https://www.youtube.com/embed/MTO1v6ZIcvo"
      onEnded={onEnded}
    />
  );
};

export default TicketPreviewIntro;
