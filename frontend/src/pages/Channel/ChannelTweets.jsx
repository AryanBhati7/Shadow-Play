import React from "react";
import { Like, SubscriberSkeleton, Tweet } from "../../components";
import { useTweets } from "../../hooks/tweet.hook";
import { useSelector } from "react-redux";
import { TweetInput } from "../../components/index";

function ChannelTweets() {
  const channelId = useSelector((state) => state.channel.channel?._id);
  const currentUserId = useSelector((state) => state.auth.user?._id);

  const isOwner = channelId === currentUserId;
  const { data: channelTweets, isFetching } = useTweets(channelId);

  if (isFetching)
    return (
      <div className="flex flex-col justify-center gap-3">
        {Array(5)
          .fill()
          .map((_, index) => (
            <SubscriberSkeleton key={index} />
          ))}
      </div>
    );

  if (channelTweets && channelTweets.length === 0) {
    return (
      <>
        {isOwner && <TweetInput />}
        <div className="flex justify-center p-4 mt-9">
          <div className="w-full max-w-sm text-center">
            <p className="mb-3 w-full">
              <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                <span className="inline-block w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    ></path>
                  </svg>
                </span>
              </span>
            </p>
            <h5 className="mb-2 font-semibold">No people subscribers</h5>
            <p>
              This channel has yet to
              <strong>subscribe</strong> a new channel.
            </p>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        {isOwner && <TweetInput />}
        {channelTweets &&
          channelTweets.map((tweet) => (
            <Tweet key={tweet._id} isOwner={isOwner} tweet={tweet} />
          ))}
      </>
    );
  }
}

export default ChannelTweets;
