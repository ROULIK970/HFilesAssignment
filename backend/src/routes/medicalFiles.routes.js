import { Router } from "express";
import {
  uploadMedicalFile,
  getMedicalFiles,
  getMedicalFileById,
  deleteMedicalFile,
} from "../controllers/medicalFile.controller";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//all are secured routes

router.route("/upload-files").post(
  verifyJWT,
  upload.fields([
    {
      name: "medicalFile",
      maxCount: 1,
    },
  ]),
  uploadMedicalFile
);

router.route("/get-all-files").get(verifyJWT, getMedicalFiles);

router.route("/get-file/:id").get(verifyJWT, getMedicalFileById);

router.route("/delete-file/:id").get(verifyJWT,deleteMedicalFile);

export default router;
