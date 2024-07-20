import React from "react";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";
import Hls from "hls.js";

import { MediaPlayer, MediaProvider, isHLSProvider } from "@vidstack/react";
import { Poster } from "@vidstack/react";
import {
  PlyrLayout,
  plyrLayoutIcons,
} from "@vidstack/react/player/layouts/plyr";

function VideoPlayer({ src, thumbnail, title, duration, autoPlay = true }) {
  return (
    <MediaPlayer
      title={title}
      src={src}
      playsInline
      crossOrigin
      autoPlay={autoPlay}
      storage={`video-player-settings-${title}`}
      duration={duration}
      className="w-full h-full"
    >
      <MediaProvider></MediaProvider>
      <PlyrLayout posterFrame={thumbnail} icons={plyrLayoutIcons} />
    </MediaPlayer>
  );
}

export default VideoPlayer;
