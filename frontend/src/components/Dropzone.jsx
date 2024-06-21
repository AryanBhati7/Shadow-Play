import React from "react";
import { useDropzone } from "react-dropzone";
import VideoPlayer from "./VideoPlayer";
import { AiOutlineCloudUpload } from "react-icons/ai";
import formatFileSize from "../assets/formatFileSize.js";

function Dropzone({ type, setFile, file }) {
  const fileTypes = {
    video: {
      "video/*": [".mp4", ".mov", ".avi", ".flv", ".wmv", ".mkv"],
    },
    image: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
  };

  const { getRootProps, getInputProps, isDragReject, open } = useDropzone({
    accept: fileTypes[type],
    onDrop: (acceptedFiles) => {
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
    multiple: false,
    noClick: true,
    noKeyboard: true,
  });

  const isImage = type === "image";
  const isVideo = type === "video";

  if (file) {
    return (
      <div className="w-full h-full border-2 border-dashed px-4 py-2 text-center">
        <div className="h-[19rem] w-full mx-auto">
          {isImage && <img src={file.preview} alt="Preview" />}
          {isVideo && (
            <VideoPlayer
              src={{
                src: file.preview,
                type: "video/mp4",
              }}
              autoPlay={false}
            />
          )}
        </div>
        <div className="mt-2  flex justify-center items-center gap-2 w-full">
          <h6 className="font-semibold w-6/12">{file.name}</h6>
          <p className="text-gray-400 w-2/12">{formatFileSize(file.size)}</p>

          <button
            className="px-6 py-3 w-4/12 border-none bg-[#ae7aff] text-black hover:bg-[#d6beff]"
            onClick={() => setFile(null)}
          >
            Select another {type}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className="w-full h-full border-2 border-dashed px-4 py-12 text-center"
    >
      <input className="sr-only" {...getInputProps()} />
      <span className="mb-4 inline-block w-24 rounded-full bg-[#E4D3FF] p-4 text-[#AE7AFF]">
        <AiOutlineCloudUpload className="w-full h-full" />
      </span>
      <h6 className="mb-2 font-semibold">
        Drag and drop {type} files to upload
      </h6>
      <p className="text-gray-400 ">
        Your {type} will be private until you publish them.
      </p>
      {isDragReject && (
        <h6 className="mb-2 font-semibold">Only {type} Files are allowed</h6>
      )}
      <label
        onClick={open}
        htmlFor="upload-video"
        aria-label="upload-video"
        className="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
      >
        Select Files
      </label>
    </div>
  );
}

export default Dropzone;
