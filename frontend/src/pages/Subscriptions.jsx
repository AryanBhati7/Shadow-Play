import React from "react";
import { useSubscribedChannels } from "../hooks/subscription.hook";
import { useSelector } from "react-redux";
import { ChannelSubscribed, VideolistCard } from "../components";
import { Link } from "react-router-dom";

function Subscriptions() {
  const userId = useSelector((state) => state.auth.user._id);

  const { data: subscriptions } = useSubscribedChannels(userId);
  console.log(subscriptions);
  return (
    <div className="container mx-auto px-2">
      <h1 className="text-3xl font-bold my-2">Subscriptions</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {subscriptions &&
          subscriptions.map((channel) => (
            <ChannelSubscribed
              key={channel._id}
              channel={channel?.subscribedChannel}
            />
          ))}
      </div>
      <div>
        <h1 className="text-2xl font-semibold  my-2">
          Latest Videos from Subscriptions
        </h1>
        <div className="flex flex-col gap-4 p-4">
          {subscriptions &&
            subscriptions.map((channel) => (
              <Link
                to={`/video/${channel?.subscribedChannel?.latestVideo?._id}`}
              >
                <VideolistCard
                  key={channel._id}
                  video={channel?.subscribedChannel?.latestVideo}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;
