import mongoose, { Schema } from "mongoose";

const img =
  "https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  avatar: {
    type: String,
    default:  img ,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {timeStamps:true});

export const User = mongoose.model("User", userSchema);
