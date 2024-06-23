import React, { useState, useEffect } from "react";
import {
  Dropzone,
  TitleInput,
  DescriptionInput,
  SpButton,
  VideoPreviewCard,
} from "./index.js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().nonempty("Title is required").min(5, "Title is too short"),
  description: z
    .string()
    .min(6, "Description must be at least 6 characters long."),
});

function VideoForm({
  isEditing = false,
  initialVideo,
  onSubmit,
  user,
  isPending,
  closeStatus,
  resetStatus,
}) {
  console.log(initialVideo, "VideoForm");
  const [video, setVideo] = useState(initialVideo?.video?.url || null);
  const [thumbnail, setThumbnail] = useState(
    initialVideo?.thumbnail?.url || null
  );

  const [title, setTitle] = useState(initialVideo?.title || "");
  const [description, setDescription] = useState(
    initialVideo?.description || ""
  );

  useEffect(() => {
    if (initialVideo) {
      setVideo(initialVideo.video?.url || null);
      setThumbnail(initialVideo.thumbnail?.url || null);
      setTitle(initialVideo.title || "");
      setDescription(initialVideo.description || "");
    }
  }, [initialVideo]);

  console.log(thumbnail, "thumbnail");
  console.log(video, "video");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialVideo?.title || "",
      description: initialVideo?.description || "",
    },
  });

  const handleFormSubmit = async (data) => {
    if (!video || (!thumbnail && !isEditing)) {
      console.error("Please upload both video and thumbnail");
      return;
    }
    if (isEditing && !thumbnail) {
      console.error("Please upload a thumbnail");
    }

    // Include the state values in the data submitted
    const formData = { ...data, video, thumbnail };
    await onSubmit(formData);
    onReset();
  };
  console.log(isPending);

  const onReset = () => {
    setVideo(null);
    setThumbnail(null);
    setTitle("");
    setDescription("");
    reset();
  };

  const onClose = () => {
    if (!thumbnail || !video) {
      onReset();
    }
  };

  useEffect(() => {
    onClose();
    onReset();
  }, [closeStatus, resetStatus]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="w-full flex justify-center items-center flex-col sm:flex-row">
        <div className="left-side flex sm:w-7/12 max-w-3xl flex-col gap-y-4 p-4 w-full">
          <div className="sm:h-[24rem]">
            <Dropzone
              file={isEditing ? thumbnail : video}
              setFile={isEditing ? setThumbnail : setVideo}
              type={isEditing ? "image" : "video"}
              isPending={isPending}
            />
          </div>

          {!isEditing && (
            <div className="w-full">
              <label htmlFor="thumbnail" className="mb-1 inline-block">
                Thumbnail<sup>*</sup>
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                disabled={isPending}
                className="w-full border p-1 file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5"
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
            </div>
          )}

          <div className="w-full">
            <TitleInput
              title={title}
              setTitle={setTitle}
              disabled={isPending}
              {...register("title", {
                onBlur: (e) => {
                  setTitle(e.target.value);
                },
              })}
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>
          <div className="w-full">
            <DescriptionInput
              description={description}
              setDescription={setDescription}
              disabled={isPending}
              {...register("description", {
                onBlur: (e) => {
                  setDescription(e.target.value);
                },
              })}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
        </div>
        <div className="right-side h-full sm:w-4/12 p-4 w-full mb-[4rem]">
          <div className="flex flex-col w-full h-full gap-6">
            <h3 className="text-[1.2rem] text-white mx-auto font-extrabold">
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
                  <span className="rotate-animation">⌛</span> Uploading your
                  Video...
                </p>
              ) : (
                <>
                  <p className="text-lg font-bold mb-2">
                    Looks Great 🤩 right? Click here to Upload
                  </p>

                  <SpButton type="submit" className="min-w-[8rem]">
                    Save
                  </SpButton>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default VideoForm;
