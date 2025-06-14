import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'



const medicalFileSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    fileType: {
      type: String,
      enum: [
        "Lab Report",
        "Prescription",
        "X-Ray",
        "Blood Report",
        "MRI Scan",
        "CT Scan",
      ],
      required: true,
    },
    fileURL: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

export const MedicalFile = mongoose.model("MedicalFile", medicalFileSchema);
