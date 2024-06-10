import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, upload_options) => {
  //YT-Clone/Avatar -> Avatar
  //YT-Clone/Cover_Images -> CoverImages
  //YT-Clone/Videos -> Videos

  // cloudinary.v2.api
  // .delete_resources(['YT-Clone/Avatar/iwhbkdnyz9xlh5ubs5s7'],
  //   { type: 'upload', resource_type: 'image' })
  // .then(console.log);
  try {
    console.log("cloudinary function init");
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(
      localFilePath,
      upload_options
    );
    if (response) fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
  }
};

const deleteFromCloudinary = async (fileId) => {
  try {
    if (!fileId) return null;
    //delete the file on cloudinary
    const response = await cloudinary.uploader.destroy(fileId);
    if (response) fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
