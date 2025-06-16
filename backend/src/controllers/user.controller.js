import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { User } from "../models/user.model.js"


const generateAccessToken = async(userId)=>{
try {
   const user = await User.findById(userId)
   const accessToken =  user.generateAccessToken()
   return {accessToken}
} catch (error) {
   throw new ApiError(500, "Something went wrong when generating accessToken")
}
}

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


const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body

    if(!email){
      throw new ApiError(400, "Email or Password is required!")
    }

   const user = await User.findOne({email})

   if(!user){
      throw new ApiError(404, "User does not exist!")
   }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if(!isPasswordValid){
      throw new ApiError(401, "Email or Password invalid")
   }

   const {accessToken} = await generateAccessToken(user._id)

   const loggedInUser = await User.findById(user._id).select("-password")
   
   const options = {
      httpOnly:true
   }


   res
   .status(200)
   .cookie("accessToken", accessToken, options)
   .json(new ApiResponse(200, loggedInUser, "Logged In Successfully!"))
})


const logoutUser = asyncHandler((req,res) =>{
   const options ={
      httpOnly:true
   }

   res
   .status(200)
   .clearCookie("accessToken", options)
   .json(new ApiResponse(200, {}, "User logged out successfully"))
})


const updateUserAvatar = asyncHandler(async (req, res) => {

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  console.log(avatarLocalPath)

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing!");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Error while uploading avatar to cloudinary!");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  res
    .status(201)
    .json(new ApiResponse(201, user, "Avatar updated sucessfully!"));
});


const updateAccountDetails = asyncHandler(async (req, res) => {
  console.log("update controller")
  const { phoneNumber, email } = req.body;
  console.log(phoneNumber)

  if (!email && !phoneNumber) {
    throw new ApiError(
      400,
      "At least one field (email or phone number) is required to update."
    );
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        email,
        phoneNumber
      },
    },
    {
      new: true,
    }
  ).select("-password");

  if (!user) {
    throw new ApiError(500, "Account details failed to update!");
  }

  res
    .status(201)
    .json(new ApiResponse(200, user, "Account details updated successfully!"));
});


export {
  registerUser,
  loginUser,
  logoutUser,
  updateUserAvatar,
  updateAccountDetails,
};