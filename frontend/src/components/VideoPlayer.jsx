import React from "react";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";
import { MdOutlinePlayCircleFilled } from "react-icons/md";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  PlyrLayout,
  plyrLayoutIcons,
} from "@vidstack/react/player/layouts/plyr";

function VideoPlayer({ src, thumbnail, title }) {
  return (
    <MediaPlayer
      title={title}
      src={src}
      autoPlay
      playsInline
      load="eager"
      viewType="video"
      storage="video-player-settings"
    >
      <MediaProvider />
      <PlyrLayout thumbnails={thumbnail} icons={plyrLayoutIcons} />
    </MediaPlayer>
  );
}

export default VideoPlayer;
