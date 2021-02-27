import React, { useEffect, useState } from "react";
import { disableBodyScroll } from "body-scroll-lock";

import styles from "./AvatarVideo.module.scss";
import ReactPlayer from "react-player";

const AvatarVideo = ({ src, onEnded }) => {
  if (!src.includes("embed")) {
    src = src.replace("www.youtube.com", "www.youtube.com/embed");
  }
  src = src.replace("www.youtube.com", "www.youtube-nocookie.com");
  src = `${src}?autoplay=1&showinfo=0&controls=0`;

  const [playWasClicked, setPlayWasClicked] = useState(false);

  const playVideo = () => {
    setPlayWasClicked(true);
  };

  const targetElement = document.querySelector(
    "#unscrollableVideounscrollableVideo"
  );
  disableBodyScroll(targetElement);

  return (
    <span className={styles.overallWrapper} id="unscrollableVideo">
      <div className={styles.avatarVideo}>
        <ReactPlayer
          url={src}
          playing={playWasClicked}
          playsinline={true}
          controls={false}
          onEnded={onEnded}
          onReady={() => {
            playVideo();
          }}
          config={{
            youtube: {
              playerVars: { showinfo: 1, autoplay: 1, showinfo: 0, start: 0.1 },
            },
          }}
        />
      </div>
    </span>
  );
};

export default AvatarVideo;
