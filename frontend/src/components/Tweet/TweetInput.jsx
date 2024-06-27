import React, { useState } from "react";
import { useAddTweet } from "../../hooks/tweet.hook";
import { useSelector } from "react-redux";
import LoginPopup from "../LoginPopup";

function TweetInput() {
  const authStatus = useSelector((state) => state.auth.authStatus);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [tweet, setTweet] = useState("");

  const { mutateAsync: addTweet, isPending } = useAddTweet();

  const sendTweet = async () => {
    if (!authStatus) {
      return setShowLoginPopup(true);
    }
    await addTweet({ tweet });
    setTweet("");
  };

  if (showLoginPopup)
    return (
      <LoginPopup
        loginTo={"write Tweet"}
        onClose={() => setShowLoginPopup(false)}
      />
    );

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
