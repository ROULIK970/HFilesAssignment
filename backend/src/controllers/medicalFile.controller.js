import { MedicalFile } from "../models/medicalFile.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


 const uploadMedicalFile = asyncHandler(async (req, res) => {
  const { fileName, fileType } = req.body;
  if(!fileName || !fileType){
    throw new ApiError(400, "File name and File Type are required!")
  }

  const existedFileName = await MedicalFile.findOne({ fileName });

  if(existedFileName){
    throw new ApiError(400, "File already exists!")
  }

  const fileLocalPath = req.files?.medicalFile?.[0]?.path;

  if (!fileLocalPath) {
    throw new ApiError(400, "File is missing");
  }



  const uploadedFile = await uploadOnCloudinary(fileLocalPath);
  console.log(uploadedFile)

  if (!uploadedFile) {
    throw new ApiError(500, "Failed to upload file to Cloudinary");
  }

  const medicalFile = await MedicalFile.create({
    owner: req.user._id,
    fileName,
    fileType,
    fileURL: uploadedFile.secure_url,
  });

  res
    .status(201)
    .json(
      new ApiResponse(201, medicalFile, "Medical file uploaded successfully")
    );
});


const getMedicalFiles = asyncHandler(async (req, res) => {
  const files = await MedicalFile.find({ owner: req.user._id });

  if(!files){
    throw new ApiError(400, "Couldn't fetch files!")
  }

  res
    .status(200)
    .json(new ApiResponse(200, files, "Medical files fetched successfully"));
});


const getMedicalFileById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const file = await MedicalFile.findOne({ _id: id, owner: req.user._id });

  if (!file) {
    throw new ApiError(404, "Medical file not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, file, "Medical file fetched successfully"));
});


const deleteMedicalFile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const file = await MedicalFile.findOneAndDelete({
    _id: id,
    owner: req.user._id,
  });

  if (!file) {
    throw new ApiError(404, "Medical file not found or already deleted");
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Medical file deleted successfully"));
});


export {
  uploadMedicalFile,
  getMedicalFiles,
  getMedicalFileById,
  deleteMedicalFile,
};