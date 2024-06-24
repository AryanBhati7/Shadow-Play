import React from "react";
import { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useUpdateCoverImage } from "../../hooks/user.hook";

function CoverImageInput({ children, setCoverImage, coverImage }) {
  const [selectedCover, setSelectedCover] = useState(coverImage || "");
  const [coverPic, setCoverPic] = useState(null);

  const { mutateAsync: updateCoverImg, isPending } = useUpdateCoverImage();

  const handleUploadCover = async () => {
    if (!coverPic) return; // No file selected
    console.log(coverPic);

    await updateCoverImg(coverPic);
  };
  return (
    <div
      className="w-full h-full mb-4 rounded-lg bg-gray-300 text-purple-700 bg-cover bg-center bg-no-repeat items-center relative"
      style={{
        backgroundImage: `url(${selectedCover})`,
      }}
    >
      <label
        htmlFor="coverphoto"
        className="gap-1 cursor-pointer w-full h-full flex justify-center items-center"
      >
        {children}
        <input
          style={{ display: "none" }}
          type="file"
          id="coverphoto"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          onChange={(e) => {
            setCoverPic(e.target.files[0]);
            setSelectedCover(URL.createObjectURL(e.target.files[0]));
          }}
        />
        <div className="absolute inset-0 w-full h-full flex justify-center items-center">
          {isPending && (
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="animate-spin rounded-full  h-14 w-14 border-t-4 border-b-4 border-purple-500"></div>
            </div>
          )}
          {coverPic && (
            <button
              className="rounded-full bg-slate-100 text-purple-500 hover:text-purple-700 p-2"
              onClick={handleUploadCover}
              title="Upload Cover"
            >
              <MdOutlineCloudUpload className="w-9 h-9 " />
            </button>
          )}
        </div>
        <div className="absolute right-0 bottom-0 bg-white/90 text-purple-700 flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold">
          Cover
          <MdOutlineCloudUpload />
        </div>
      </label>
    </div>
  );
}

export default CoverImageInput;
