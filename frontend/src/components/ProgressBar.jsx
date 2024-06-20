import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ progress }) => {
  // Artificially slow down progress updates as they near 100%
  const adjustedProgress = progress < 100 ? Math.min(80, progress) : progress;

  return (
    <div
      className="loading h-2 z-40 top-0 w-full"
      style={{
        width: `${adjustedProgress}%`,
        transition: "all 200ms",
        backgroundColor: "#ae7aff",
        position: "sticky",
      }}
    ></div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
