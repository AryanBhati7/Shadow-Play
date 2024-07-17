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
      autoPlay={autoPlay}
      playsInline
      load="eager"
      posterLoad="eager"
      crossOrigin
      storage={`video-player-settings-${title}`}
      duration={duration}
      streamType="on-demand"
      className="w-full h-full"
    >
      <MediaProvider>
        <PlyrLayout posterFrame={thumbnail} icons={plyrLayoutIcons} />
      </MediaProvider>
    </MediaPlayer>
  );
}

export default VideoPlayer;
