import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SpButton, ProgressBar, VideoPreviewCard, Dropzone } from "../index.js";
import { useDispatch, useSelector } from "react-redux";
import { useUploadVideo } from "../../hooks/video.hook.js";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { setShowUploadVideo } from "../../features/uiSlice.js";
import toast from "react-hot-toast";

function UploadVideo() {
  const showStatus = useSelector((state) => state.ui.showUploadVideo);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const schema = z.object({
    title: z
      .string()
      .nonempty("Title is required")
      .min(5, "Title is too short"),
    description: z
      .string()
      .min(6, "Description must be at least 6 characters long."),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);

  const { mutateAsync: uploadVideo, isPending } = useUploadVideo();
  const onSave = async (data) => {
    if (!video || !thumbnail) {
      toast.error("Please upload both video and thumbnail");
      return;
    }
    data.video = video;
    data.thumbnail = thumbnail;
    const res = await uploadVideo(data);
    if (res) {
      setVideo(null);
      setThumbnail(null);
      setTitle("");
      setDescription("");

      dispatch(setShowUploadVideo(false));
    }
  };

  const handleClose = () => {
    if (isPending) {
      toast("Video is still uploading please wait", {
        icon: "⌛",
      });
      return;
    }

    if (!thumbnail || !video) {
      setVideo(null);
      setThumbnail(null);
      setTitle("");
      setDescription("");
      reset();
    }

    dispatch(setShowUploadVideo(false));
  };

  const handleReset = () => {
    if (isPending) {
      toast("Video is still uploading please wait", {
        icon: "⌛",
      });
      return;
    }
    setVideo(null);
    setThumbnail(null);
    setTitle("");
    setDescription("");
    reset();
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
        {isPending && <ProgressBar />}
        <form onSubmit={handleSubmit(onSave)}>
          <div className="w-full flex  justify-center items-center flex-col sm:flex-row">
            <div className=" left-side  flex sm:w-7/12 max-w-3xl flex-col gap-y-4 p-4 w-full">
              <div className="sm:h-[24rem] ">
                <Dropzone file={video} setFile={setVideo} type="video" />
              </div>

              <div className="w-full">
                <label htmlFor="thumbnail" className="mb-1 inline-block">
                  Thumbnail
                  <sup>*</sup>
                </label>
                <input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  className="w-full border p-1 file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
              </div>
              <div className="w-full">
                <label htmlFor="title" className="mb-1 inline-block">
                  Title
                  <sup>*</sup>
                  {errors.title && (
                    <span className="text-red-500 px-2">
                      {errors.title.message}
                    </span>
                  )}
                </label>
                <input
                  id="title"
                  type="text"
                  className="w-full border bg-transparent px-2 py-2 outline-none"
                  {...register("title")}
                  onBlur={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label htmlFor="desc" className="mb-1 inline-block">
                  Description
                  <sup>*</sup>
                </label>
                {errors.description && (
                  <span className="text-red-500 px-2">
                    {errors.description.message}
                  </span>
                )}
                <textarea
                  id="desc"
                  className="h-40 w-full resize-none border bg-transparent px-2 py-1 outline-none"
                  {...register("description")}
                  onBlur={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="right-side h-full  sm:w-4/12 p-4 w-full  mb-[4rem]">
              <div className="flex flex-col w-full h-full gap-6">
                <h3 className="text-[1.2rem]  text-white mx-auto font-extrabold">
                  Your Video will look something like this
                </h3>
                <VideoPreviewCard
                  video={video}
                  thumbnail={thumbnail}
                  title={title}
                  description={description}
                  name={user?.fullName}
                />
                <div className="text-center p-2 rounded">
                  {isPending ? (
                    <p className="text-lg font-bold mb-2">
                      ⌛ Uploading your Video...
                    </p>
                  ) : (
                    <>
                      <p className="text-lg font-bold mb-2">
                        Looks Great 🤩 right? Click here to Upload
                      </p>

                      <SpButton type="submit" className="min-w-[8rem]">
                        {" "}
                        Save{" "}
                      </SpButton>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadVideo;
