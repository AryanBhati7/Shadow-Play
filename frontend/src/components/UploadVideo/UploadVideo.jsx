import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SpButton, ProgressBar } from "../index.js";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import UploadingVideoModal from "./UploadingVideoModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { BsCardImage } from "react-icons/bs";
import { useUploadVideo } from "../../hooks/video.hook.js";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { setShowUploadVideo } from "../../features/uiSlice.js";

function UploadVideo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const schema = z.object({
    title: z.string().min(3),
    description: z.string().min(6),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const onDrop = useCallback(
    (acceptedVideo) => {
      setVideo(acceptedVideo[0]);
    },
    [video]
  );
  const { getRootProps, getInputProps, isDragReject, open } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".flv", ".wmv", ".mkv"],
    },
    multiple: false,
    noClick: true,
    noKeyboard: true,
  });

  const {
    mutateAsync: uploadVideo,
    uploadProgress,
    isPending,
  } = useUploadVideo();
  const onSave = async (data) => {
    console.log("Hello onSave called");
    data.video = video;
    data.thumbnail = thumbnail;
    const res = await uploadVideo(data);
    console.log(res, "return by hook");
  };

  const handleClose = () => {
    dispatch(setShowUploadVideo(false));
  };

  return (
    <div className="mt-16 ml-0 overflow-x-hidden sm:ml-8 absolute  inset-0 z-10 bg-black/50 px-4 w-full  pb-[80px] pt-4 sm:px-14 sm:py-8">
      <div className="h-full  overflow-y-auto border bg-[#121212] ">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">Upload Video</h2>
          <button onClick={handleClose}>
            <IoIosCloseCircleOutline className="w-8 h-8" />
          </button>
        </div>
        <ProgressBar progress={uploadProgress} />
        <div className="w-full flex  justify-center items-center flex-col sm:flex-row">
          <div className=" left-side  flex sm:w-7/12 max-w-3xl flex-col gap-y-4 p-4 w-full">
            {video ? (
              <div className="w-full border-2  px-4 py-12">
                <UploadingVideoModal setVideo={setVideo} video={video} />
              </div>
            ) : (
              <div
                {...getRootProps()}
                className="w-full border-2 border-dashed px-4 py-12 text-center"
              >
                <input className="sr-only" {...getInputProps()} />
                <span className="mb-4 inline-block w-24 rounded-full bg-[#E4D3FF] p-4 text-[#AE7AFF]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    ></path>
                  </svg>
                </span>
                {isDragReject && (
                  <h6 className="mb-2 font-semibold">
                    Only Videos Files are allowed
                  </h6>
                )}
                {!isDragReject && (
                  <>
                    <h6 className="mb-2 font-semibold">
                      Drag and drop video files to upload
                    </h6>
                    <p className="text-gray-400 ">
                      Your videos will be private until you publish them.
                    </p>
                    <label
                      onClick={open}
                      htmlFor="upload-video"
                      className="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                    >
                      Select Files
                    </label>
                  </>
                )}
              </div>
            )}

            <div className="w-full">
              <label htmlFor="thumbnail" className="mb-1 inline-block">
                Thumbnail
                <sup>*</sup>
              </label>
              <input
                id="thumbnail"
                type="file"
                className="w-full border p-1 file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5"
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
            </div>
            <div className="w-full">
              <label htmlFor="title" className="mb-1 inline-block">
                Title
                <sup>*</sup>
              </label>
              <input
                id="title"
                type="text"
                className="w-full border bg-transparent px-2 py-1 outline-none"
                {...register("title")}
                onBlur={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label htmlFor="desc" className="mb-1 inline-block">
                Description
                <sup>*</sup>
              </label>
              <textarea
                id="desc"
                className="h-40 w-full resize-none border bg-transparent px-2 py-1 outline-none"
                {...register("description")}
                onBlur={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="right-side h-full  sm:w-4/12 p-4 w-full  mb-[12rem]">
            <div className="flex flex-col w-full h-full gap-6">
              <h3 className="text-[1.2rem]  text-white mx-auto font-extrabold">
                Your Video will look like this
              </h3>
              <div className="w-full bg-gray-800 rounded-lg shadow-md overflow-hidden text-white">
                <div className="relative mb-2 w-full pt-[56%]">
                  <div className="absolute inset-0">
                    {thumbnail && video ? (
                      <img
                        src={URL.createObjectURL(thumbnail)}
                        alt="thumbnail-videocard"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex flex-col items-center justify-center">
                        <BsCardImage className="w-full h-full" />
                        <p className="mt-2">
                          Please upload both Video and Thumbnail to see Preview
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h6 className="mb-2 font-semibold text-lg">
                    {title ? title : "Video Title"}
                  </h6>
                  <p className="text-sm text-gray-300 mb-2">
                    {description && description.length > 250
                      ? `${description.substring(0, 250)}...`
                      : description
                      ? description
                      : "Video description ........"}
                  </p>
                  <p className="text-sm text-gray-500">By {user.fullName}</p>
                </div>
              </div>
              <div className="text-center p-2 rounded">
                <p className="text-lg font-bold mb-2">
                  Looks Great right? Click here to Upload
                </p>
                <SpButton
                  onClick={handleSubmit(onSave)}
                  className="min-w-[8rem]"
                >
                  {" "}
                  Save{" "}
                </SpButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadVideo;
