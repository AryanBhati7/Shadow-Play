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

    const uploadedCover = await updateCoverImg(coverPic);
    if (uploadedCover) {
      setSelectedCover(uploadedCover?.data?.coverImage?.url);
      setCoverPic(null);
    }
  };
  return (
    <div
      className=" w-full h-full mb-4 rounded-lg  text-purple-700 bg-cover bg-center bg-no-repeat items-center relative"
      style={{
        backgroundImage: `url(${selectedCover})`,
      }}
    >
      <label
        htmlFor="coverphoto"
        className={`gap-1 ${
          isPending ? " cursor-progress" : " cursor-pointer"
        } w-full h-full flex justify-center items-center`}
      >
        {children}
        <input
          style={{ display: "none" }}
          type="file"
          id="coverphoto"
          disabled={isPending}
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
              className={`${
                isPending && " cursor-not-allowed"
              } rounded-full bg-slate-100 text-purple-500 hover:text-purple-700 p-2`}
              onClick={handleUploadCover}
              title="Upload Cover"
              disabled={isPending}
            >
              <MdOutlineCloudUpload className="w-9 h-9 " />
            </button>
          )}
        </div>
        <div
          className={`${
            isPending ? "cursor-not-allowed" : "cursor-pointer"
          } absolute right-0 bottom-0 bg-white/90 text-purple-700 flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold`}
        >
          Cover
          <MdOutlineCloudUpload />
        </div>
      </label>
    </div>
  );
}

export default CoverImageInput;
