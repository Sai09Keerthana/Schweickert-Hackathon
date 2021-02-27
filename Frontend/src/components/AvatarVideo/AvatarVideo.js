import React, { useState } from "react";
import ReactPlayer from "react-player";
import { disableBodyScroll } from "body-scroll-lock";

import styles from "./AvatarVideo.module.scss";

const AvatarVideo = ({ src, onEnded }) => {
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
      {!playWasClicked && (
        <div className={styles.overlayImage} onClick={playVideo}>
          <img
            src="http://s3.amazonaws.com/content.newsok.com/newsok/images/mobile/play_button.png"
            id="cover"
          />
        </div>
      )}
      <div className={styles.avatarVideo}>
        <ReactPlayer
          url={src}
          playing={playWasClicked}
          playsinline={true}
          controls={false}
          onEnded={onEnded}
          config={{
            youtube: {
              playerVars: { showinfo: 1 },
            },
          }}
        />
      </div>
    </span>
  );
};

export default AvatarVideo;
