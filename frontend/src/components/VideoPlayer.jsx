import React from "react";
import "@vime/core/themes/default.css";
import "@vime/core/themes/light.css";
import { Hls } from "@vime/react";
import { Player, Ui, DefaultUi, DefaultControls, Video } from "@vime/react";

function VideoPlayer({ src }) {
  return (
    <Player>
      <Hls version="latest">
        <source data-src={src} type="application/x-mpegURL" />
      </Hls>

      <DefaultUi noControls>
        <DefaultControls hideOnMouseLeave activeDuration={2000} />
      </DefaultUi>
    </Player>
  );
}

export default VideoPlayer;
