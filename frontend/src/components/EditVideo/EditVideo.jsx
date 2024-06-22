import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SpButton, ProgressBar, VideoPreviewCard, Dropzone } from "../index.js";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEditVideo, useVideoById } from "../../hooks/video.hook.js";
import { setShowEditVideo } from "../../features/uiSlice.js";
import { useEffect } from "react";
import { setVideoForEdit } from "../../features/videoSlice.js";

function EditVideo() {
  const dispatch = useDispatch();
  const video = useSelector((state) => state.video.videoForEdit);
  console.log(video);
  const schema = z.object({
    title: z

      .string()
      .nonempty("Title is required")
      .min(5, "Title is too short"),
    description: z

      .string()
      .min(6, "Description must be at least 6 characters long."),
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  console.log(video);
  console.log(isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: video?.title || "",
      description: video?.description || "",
    },
  });
  const user = useSelector((state) => state.auth.user);

  const { mutateAsync: editVideo, isPending } = useEditVideo();

  console.log(thumbnail);

  const onEdit = () => {};
  const handleReset = () => {};

  const handleClose = () => {
    dispatch(setShowEditVideo(false));
  };

  useEffect(() => {
    if (video) {
      setTitle(video.title);
      setDescription(video.description);
      setThumbnail(video.thumbnail.url);
    }
  });

  return (
    <div className="mt-16 ml-0 overflow-x-hidden  sm:ml-8 absolute  inset-0 z-10 bg-black/50 px-4 w-full  pb-[80px] pt-4 sm:px-14 sm:py-8">
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
        <form onSubmit={handleSubmit(onEdit)}>
          <div className="w-full flex  justify-center items-center flex-col sm:flex-row">
            <div className=" left-side  flex sm:w-7/12 max-w-3xl flex-col gap-y-4 p-4 w-full">
              <div className="flex-col flex gap-1 w-full ">
                <label className="inline-block">
                  Thumbnail
                  <sup>*</sup>
                </label>
                <div className="sm:h-[24rem] ">
                  <Dropzone
                    file={thumbnail}
                    setFile={setThumbnail}
                    type="image"
                  />
                </div>
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

export default EditVideo;
