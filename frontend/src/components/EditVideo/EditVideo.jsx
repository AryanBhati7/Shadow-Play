import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SpButton,
  ProgressBar,
  VideoPreviewCard,
  Dropzone,
  VideoForm,
} from "../index.js";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEditVideo, useVideoById } from "../../hooks/video.hook.js";
import { setShowEditVideo } from "../../features/uiSlice.js";
import { useEffect } from "react";
import { setVideoForEdit } from "../../features/videoSlice.js";

function EditVideo() {
  const dispatch = useDispatch();
  const video = useSelector((state) => state.video.videoForEdit);
  const user = useSelector((state) => state.auth.user);

  console.log("Edit Video component");

  const [videoEdit, setVideoEdit] = useState(video);
  const [resetStatus, setResetStatus] = useState(false);
  const [closeStatus, setCloseStatus] = useState(false);

  const { mutateAsync: editVideo, isPending } = useEditVideo();

  const onEdit = async (data) => {
    const res = await editVideo(data);
    if (res) {
      dispatch(setShowEditVideo(false));
    }
    return res;
  };

  const handleReset = () => {
    if (isPending) {
      toast("Video is still uploading please wait", {
        icon: "⌛",
      });
      return;
    }
    setResetStatus((prevStatus) => !prevStatus);
  };

  const handleClose = () => {
    if (isPending) {
      toast("Video is still uploading please wait", {
        icon: "⌛",
      });
      return;
    }
    setResetStatus((prevStatus) => !prevStatus);
    dispatch(setShowEditVideo(false));
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="
       mt-16 ml-0 overflow-x-hidden  sm:ml-8 absolute  inset-0 z-10 bg-black/50 px-4 w-full  pb-[80px] pt-4 sm:px-14 sm:py-8"
    >
      {" "}
      <div className="h-full overflow-auto border bg-[#121212] ">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">
            {isPending && <span>Uploading your Video...</span>}
            {!isPending && "Edit Video"}
          </h2>
          <div className="flex gap-4 items-center justify-center">
            <SpButton onClick={handleReset}> Reset </SpButton>
            <button onClick={handleClose}>
              <IoIosCloseCircleOutline className="w-8 h-8" />
            </button>
          </div>
        </div>
        {isPending && <ProgressBar />}
        <VideoForm
          isEditing={true}
          initialVideo={videoEdit}
          onSubmit={onEdit}
          closeStatus={closeStatus}
          resetStatus={resetStatus}
          user={user}
          isPending={isPending}
        />
      </div>
    </div>
  );
}

export default EditVideo;
