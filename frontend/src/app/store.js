import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import medicalFilesReducer from "../features/medicalFile/medicalFileSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    medicalFiles: medicalFilesReducer
  },
});

export default store;
