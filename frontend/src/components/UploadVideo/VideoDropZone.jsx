import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const VideoUploader = ({ onFileSelect }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onFileSelect(acceptedFiles[0]);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "video/*",
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="w-full border-2 border-dashed px-4 py-12 text-center"
    >
      <input {...getInputProps()} className="sr-only" />
      <span className="mb-4 inline-block w-24 rounded-full bg-[#E4D3FF] p-4 text-[#AE7AFF]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
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
  );
};

export default VideoUploader;
