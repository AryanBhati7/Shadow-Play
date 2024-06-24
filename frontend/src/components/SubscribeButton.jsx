import React, { useState } from "react";
import { HiOutlineUserAdd } from "react-icons/hi";
import { LiaUserCheckSolid } from "react-icons/lia";
import { useSubscribe } from "../hooks/subscription.hook";
import SpButton from "./SpButton";
import Button from "./Button";

function SubscribeButton({ isSubscribed, channelId }) {
  const { mutateAsync: subscribe } = useSubscribe();

  const [isSubscribedState, setIsSubscribedState] = useState(isSubscribed);

  const handleSubscribe = async () => {
    setIsSubscribedState(!isSubscribedState);
    await subscribe(channelId);
  };

  return (
    <>
      {isSubscribedState ? (
        <Button
          onClick={() => handleSubscribe()}
          className={` flex justify-center items-center gap-3 mr-1  bg-[#b2b2b2] px-3 py-2 text-center font-bold text-black  transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto `}
        >
          <LiaUserCheckSolid className="w-5 h-5" />
          Subscribed
        </Button>
      ) : (
        <SpButton
          onClick={() => handleSubscribe()}
          className="flex justify-center items-center gap-4"
        >
          <HiOutlineUserAdd className="w-5 h-5" />
          Subscribe
        </SpButton>
      )}
    </>
  );
}

export default SubscribeButton;
