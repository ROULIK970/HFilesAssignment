import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { User } from "../models/user.model.js"

const registerUser = asyncHandler(async(req,res) =>{
  //get user details from frontend
  const { fullName, email, phoneNumber, gender, password } = req.body;

  //validate for no empty input for required fields
  if ([fullName, email, phoneNumber, gender, password].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  //check if user exist
  const existedUser = await User.findOne({ email });
  
  if (existedUser) {
    throw new ApiError(409, "User with email already exist!");
  }
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
 
  //check if avatar exist
  //upload avatar on cloudinary
  let avatarUrl = undefined;

  if (avatarLocalPath) {
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    
    avatarUrl = avatar?.url;
  }
  //save in database
  const user = await User.create({
    fullName,
    email,
    phoneNumber,
    gender,
    password,
    avatar: avatarUrl
  });

  //check if user entered in db
  //remove password from response
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  //send response
  res
  .status(201)
  .json(new ApiResponse(201, createdUser, "User registered successfully!"))
})


export {registerUser}