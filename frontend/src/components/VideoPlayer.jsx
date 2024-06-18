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
    <MediaPlayer title={title} src={src} autoPlay playsInline>
      <MediaProvider />
      <PlyrLayout thumbnails={thumbnail} icons={plyrLayoutIcons} />
    </MediaPlayer>
  );
}

export default VideoPlayer;

{
  /* <Player>
  <Hls version="latest" poster={poster}>
    <source data-src={src} type="application/x-mpegURL" />
  </Hls>

  <DefaultUi noControls>
    <Spinner showWhenMediaLoading={true} />
    <DefaultControls hideOnMouseLeave activeDuration={2000} />
    <DblClickFullscreen />
    <ClickToPlay useOnMobile={true} />
  </DefaultUi>
</Player> */
}
