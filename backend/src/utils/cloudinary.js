import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new ApiError("Local File Path not provided!");
    }
    //upload file on cloudinary
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "HFiles",
    });
    console.log("File uploaded succesfully!", res.url);
    fs.unlinkSync(localFilePath);
    return res;
  } catch (error) {
    console.log("Error occured while uploading on Cloudinary", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};
