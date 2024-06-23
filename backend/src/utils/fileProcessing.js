import ffmpeg from "fluent-ffmpeg";
import sharp from "sharp";
import fs from "fs";
import { promisify } from "util";

const unlinkAsync = promisify(fs.unlink);
const accessAsync = promisify(fs.access);

// Preprocess Thumbnail
export async function preprocessThumbnail(thumbnailPath) {
  const outputPath = thumbnailPath + "-optimized.jpg";
  try {
    await sharp(thumbnailPath)
      .resize(800) // Resize to width of 800px, keeping aspect ratio
      .jpeg({ quality: 80 }) // Reduce quality to 80%
      .toFile(outputPath);
    await unlinkAsync(thumbnailPath); // Delete original file after successful optimization
  } catch (error) {
    throw new Error(`Failed to preprocess thumbnail: ${error}`);
  }
  return outputPath;
}

// Preprocess Avatar
export async function preprocessAvatar(avatarPath) {
  const outputPath = avatarPath + "-optimized.jpg";
  try {
    await sharp(avatarPath)
      .resize(800) // Resize to width of 800px, keeping aspect ratio
      .jpeg({ quality: 80 }) // Reduce quality to 80%
      .toFile(outputPath);
    await unlinkAsync(avatarPath); // Delete original file after successful optimization
  } catch (error) {
    throw new Error(`Failed to preprocess avatar: ${error}`);
  }
  return outputPath;
}

// Preprocess Video
export async function preprocessVideo(videoPath) {
  const outputPath = videoPath + "-optimized.mp4";

  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .outputOptions([
        "-preset veryfast",
        "-crf 28", // Lower CRF = higher quality
        "-s 1280x720", // Resize to 720p
      ])
      .output(outputPath)
      .on("end", async () => {
        try {
          await unlinkAsync(videoPath); // Delete original file after successful optimization
          resolve(outputPath);
        } catch (error) {
          reject(new Error(`Failed to delete original video: ${error}`));
        }
      })
      .on("error", (err) =>
        reject(new Error(`Failed to preprocess video: ${err}`))
      )
      .run();
  });
}
