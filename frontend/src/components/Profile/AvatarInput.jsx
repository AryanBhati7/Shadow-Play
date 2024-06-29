import React, { useState } from "react";
import { MdOutlineCloudUpload, MdEdit } from "react-icons/md";
import { useUpdateAvatar } from "../../hooks/user.hook";

function AvatarInput({ avatar }) {
  const [profilePic, setProfilePic] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(avatar || "");

  const { mutateAsync: uploadAvatar, isPending } = useUpdateAvatar();

  const handleUploadAvatar = async () => {
    if (!profilePic) return; // No file selected

    const uploadedAvatar = await uploadAvatar(profilePic);
    if (uploadedAvatar) {
      setSelectedProfile(uploadedAvatar?.data?.avatar?.url);
      setProfilePic(null);
    }
  };

  return (
    <div
      className=" relative h-full w-full rounded-full bg-blue-300/20 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${selectedProfile})` }}
    >
      {isPending && (
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500"></div>
        </div>
      )}
      <label
        htmlFor="profileImg"
        className={`absolute inset-0 flex justify-center items-center ${
          isPending ? "cursor-progress" : "cursor-pointer"
        }`}
      >
        <input
          type="file"
          id="profileImg"
          accept="image/*"
          style={{ display: "none" }}
          disabled={isPending}
          onChange={(e) => {
            setSelectedProfile(URL.createObjectURL(e.target.files[0]));
            setProfilePic(e.target.files[0]);
          }}
        />
        <div className="relative h-full w-full justify-center items-center gap-4 z-30 flex flex-col">
          {profilePic && (
            <button
              className={`bg-purple-500 text-white p-1 rounded-full hover:bg-purple-600 text-sm ${
                isPending && "cursor-not-allowed"
              }`}
              onClick={handleUploadAvatar}
              title="Upload Avatar"
              disabled={isPending}
            >
              <MdOutlineCloudUpload className="w-8 h-8" />
            </button>
          )}
          <span className="bg-white z-40 rounded-full absolute right-0 bottom-0 p-1">
            <MdEdit className="w-6 text-purple-500 hover:opacity-100" />
          </span>
        </div>
      </label>
    </div>
  );
}

export default AvatarInput;
