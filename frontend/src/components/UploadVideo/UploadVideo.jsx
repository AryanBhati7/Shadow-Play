import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SpButton, ProgressBar, VideoForm } from "../index.js";
import { useDispatch, useSelector } from "react-redux";
import { useUploadVideo } from "../../hooks/video.hook.js";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { setShowUploadVideo } from "../../features/uiSlice.js";
import toast from "react-hot-toast";

function UploadVideo() {
  const showStatus = useSelector((state) => state.ui.showUploadVideo);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [resetStatus, setResetStatus] = useState(false);
  const [closeStatus, setCloseStatus] = useState(false);

  const { mutateAsync: uploadVideo, isPending } = useUploadVideo();
  const onSave = async (data) => {
    const res = await uploadVideo(data);
    if (res) {
      dispatch(setShowUploadVideo(false));
    }
    return res;
  };

  const handleClose = () => {
    if (isPending) {
      toast("Video is still uploading please wait", {
        icon: "⌛",
      });
      return;
    }
    setResetStatus((prevStatus) => !prevStatus);

    dispatch(setShowUploadVideo(false));
  };

  console.log("upload video");

  const handleReset = () => {
    if (isPending) {
      toast("Video is still uploading please wait", {
        icon: "⌛",
      });
      return;
    }
    setResetStatus((prevStatus) => !prevStatus);
  };

  return (
    <div
      className={`${
        showStatus ? "" : "hidden"
      } mt-16 ml-0 overflow-x-hidden  sm:ml-8 absolute  inset-0 z-10 bg-black/50 px-4 w-full  pb-[80px] pt-4 sm:px-14 sm:py-8`}
    >
      <div className="h-full overflow-auto border bg-[#121212] ">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">
            {isPending && <span>Uploading your Video...</span>}
            {!isPending && "Upload Video"}
          </h2>
          <div className="flex gap-4 items-center justify-center">
            <SpButton onClick={handleReset}> Reset </SpButton>
            <button onClick={handleClose}>
              <IoIosCloseCircleOutline className="w-8 h-8" />
            </button>
          </div>
        </div>
        {isPending && <ProgressBar />}{" "}
        <VideoForm
          onSubmit={onSave}
          closeStatus={closeStatus}
          resetStatus={resetStatus}
          user={user}
          isPending={isPending}
        />
      </div>
    </div>
  );
}

export default UploadVideo;
