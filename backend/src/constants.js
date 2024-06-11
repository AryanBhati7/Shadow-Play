export const DB_NAME = "ytbackend";

export const coverImg_upOptions = {
  folder: "YT-Clone/Cover_Image",
  resource_type: "image",
};

export const avatar_upOptions = {
  folder: "YT-Clone/Avatar",
  resource_type: "image",
};
export const thumbnail_upOptions = {
  folder: "YT-Clone/Thumbnails",
  resource_type: "image",
};

export const video_upOptions = {
  folder: "YT-Clone/Videos",
  resource_type: "video",
  eager: [{ streaming_profile: "full_hd", format: "m3u8" }],
  eager_async: true,
  eager_notification_url: "http://localhost:8000/",
};
