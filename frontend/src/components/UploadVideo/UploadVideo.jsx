import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { VideoDropZone } from "../index.js";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function UploadVideo() {
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

  const onVideoFileSelect = (file) => {
    console.log(file);
  };
  const onDrop = useCallback(
    (acceptedVideo) => {
      onVideoFileSelect(acceptedVideo[0]);
    },
    [onVideoFileSelect]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "video/*",
    multiple: false,
  });

  return (
    <div className="mt-16 ml-0 overflow-x-hidden sm:ml-8 absolute  inset-0 z-10 bg-black/50 px-4 w-full  pb-[80px] pt-4 sm:px-14 sm:py-8">
      <div className="h-full  overflow-y-auto border bg-[#121212] ">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">Upload Video</h2>
          <button className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
            Save
          </button>
        </div>
        <div className="w-full flex  justify-center items-center flex-col sm:flex-row">
          <form className=" left-side  flex sm:w-7/12 max-w-3xl flex-col gap-y-4 p-4 w-full">
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
                  ariaHidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  ></path>
                </svg>
              </span>
              <h6 className="mb-2 font-semibold">
                Drag and drop video files to upload
              </h6>
              <p className="text-gray-400">
                Your videos will be private until you publish them.
              </p>
              <label
                htmlFor="upload-video"
                className="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
              >
                Select Files
              </label>
            </div>
            <div className="w-full">
              <label htmlFor="thumbnail" className="mb-1 inline-block">
                Thumbnail
                <sup>*</sup>
              </label>
              <input
                id="thumbnail"
                type="file"
                className="w-full border p-1 file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5"
                register={register("thumbnail")}
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
                register={register("title")}
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
                register={register("description")}
              ></textarea>
            </div>
          </form>
          <div className="right-side h-full  sm:w-4/12 flex justify-center items-center p-4 w-full">
            <div className="w-full">
              <div className="relative mb-2 w-full pt-[56%]">
                <div className="absolute inset-0">
                  <img
                    src="https://images.pexels.com/photos/1739849/pexels-photo-1739849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="empty"
                    className="h-full w-full"
                  />
                </div>
              </div>
              <div className="flex gap-x-2">
                <div className="w-full">
                  <h6 className="mb-1 font-semibold">Video Title</h6>

                  <p className="text-sm text-gray-200">By Aryan Bhati</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadVideo;
