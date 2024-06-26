import React from "react";
import { useSubscribedChannels } from "../hooks/subscription.hook";
import { useSelector } from "react-redux";
import { ChannelSubscribed, VideolistCard } from "../components";
import { Link } from "react-router-dom";

function Subscriptions() {
  const userId = useSelector((state) => state.auth.user._id);

  const { data: subscriptions } = useSubscribedChannels(userId);
  console.log(subscriptions);

  if (subscriptions && subscriptions.length === 0) {
    return (
      <div className="container mx-auto px-2">
        <h1 className="text-3xl font-bold my-2">Subscriptions</h1>
        <p className="text-lg">You are not subscribed to any channels</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-2">
      <h1 className="text-3xl font-bold my-2">Subscriptions</h1>
      <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-2">
        {subscriptions &&
          subscriptions.map((channel) => (
            <ChannelSubscribed
              key={channel?.subscribedChannel?._id}
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
                key={channel?.subscribedChannel._id}
              >
                <VideolistCard
                  video={channel?.subscribedChannel?.latestVideo}
                  owner={{
                    avatar: channel?.subscribedChannel?.avatar,
                    username: channel?.subscribedChannel?.username,
                    fullName: channel?.subscribedChannel?.fullName,
                  }}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;
