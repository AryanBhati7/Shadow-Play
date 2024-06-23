export const DB_NAME = "ytbackend";

export const coverImg_upOptions = {
  folder: "yt-tweets/cover-image",
  resource_type: "image",
};

export const avatar_upOptions = {
  folder: "yt-tweets/avatar",
  resource_type: "image",
};
export const thumbnail_upOptions = {
  folder: "yt-tweets/thumbnail",
  resource_type: "image",
};

export const video_upOptions = {
  folder: "yt-tweets/video",
  resource_type: "video",
  eager: [{ streaming_profile: "full_hd", format: "m3u8" }],
  eager_async: true,
  eager_notification_url: "http://localhost:8000/",
};
