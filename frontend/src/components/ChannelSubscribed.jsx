import React from "react";

function ChannelSubscribed({ channel }) {
  return (
    <div className="flex flex-col items-center gap-2  rounded-lg">
      <img
        src={channel?.avatar?.url}
        alt={`${channel?.username}'s avatar`}
        className="w-12 h-12 rounded-full object-cover"
      />
      <p className="text-lg font-semibold">{channel?.username}</p>
    </div>
  );
}

export default ChannelSubscribed;
