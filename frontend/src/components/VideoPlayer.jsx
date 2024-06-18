import React from "react";
import "@vime/core/themes/default.css";
import "@vime/core/themes/light.css";
import { Hls } from "@vime/react";
import {
  Player,
  DefaultUi,
  DefaultControls,
  ClickToPlay,
  DblClickFullscreen,
  Spinner,
} from "@vime/react";

function VideoPlayer({ src, poster }) {
  return (
    <Player>
      <Hls version="latest" poster={poster}>
        <source data-src={src} type="application/x-mpegURL" />
      </Hls>

      <DefaultUi noControls>
        <Spinner showWhenMediaLoading={true} />
        <DefaultControls hideOnMouseLeave activeDuration={2000} />
        <DblClickFullscreen />
        <ClickToPlay useOnMobile={true} />
      </DefaultUi>
    </Player>
  );
}

export default VideoPlayer;
