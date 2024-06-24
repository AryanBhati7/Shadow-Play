import React, { useState } from "react";
import { useAddTweet } from "../../hooks/tweet.hook";

function TweetInput({ initialTweet }) {
  const [tweet, setTweet] = useState(initialTweet || "");

  const { mutateAsync: addTweet, isPending } = useAddTweet();

  const sendTweet = async () => {
    await addTweet({ tweet });
    setTweet("");
  };

  return (
    <div className="w-full mt-3 ">
      <textarea
        className="w-full bg-transparent p-2 border rounded-lg border-slate-300"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
      ></textarea>
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={sendTweet}
      >
        Send
      </button>
    </div>
  );
}

export default TweetInput;
