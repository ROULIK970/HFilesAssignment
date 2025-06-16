import {Router} from "express"
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserAvatar,
  updateAccountDetails,
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router()



router.route("/register").post( 
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        }
    ])
, registerUser)

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);

router.route("/update-avatar").post(
    verifyJWT, 
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        }
    ]), 
    updateUserAvatar);


router.route("/update-account-details").post(verifyJWT, updateAccountDetails);

export default router