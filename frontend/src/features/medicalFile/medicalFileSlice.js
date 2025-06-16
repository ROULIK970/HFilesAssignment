import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "https://hfilesassignment.onrender.com/api/v1/files";


export const uploadMedicalFile = createAsyncThunk(
  "medicalFiles/upload",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/upload-files`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Upload failed");
    }
  }
);

export const fetchMedicalFiles = createAsyncThunk(
  "medicalFiles/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/get-all-files`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Fetch failed");
    }
  }
);

export const fetchMedicalFileById = createAsyncThunk(
  "medicalFiles/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/get-file/${id}`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "File not found");
    }
  }
);

export const deleteMedicalFile = createAsyncThunk(
  "medicalFiles/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/delete-file/${id}`, {
        withCredentials: true,
      });
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);

const medicalFileSlice = createSlice({
  name: "medicalFiles",
  initialState: {
    files: [],
    selectedFile: null,
    loading: false,
    error: null,
  },
 
  extraReducers: (builder) => {
    builder
      // Upload
      .addCase(uploadMedicalFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadMedicalFile.fulfilled, (state, action) => {
        state.loading = false;
        state.files.push(action.payload);
        toast.success("File uploaded!");
      })
      .addCase(uploadMedicalFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Fetch all
      .addCase(fetchMedicalFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicalFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.files = action.payload;
      })
      .addCase(fetchMedicalFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Fetch one
      .addCase(fetchMedicalFileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicalFileById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedFile = action.payload;
      })
      .addCase(fetchMedicalFileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Delete
      .addCase(deleteMedicalFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMedicalFile.fulfilled, (state, action) => {
        state.loading = false;
        state.files = state.files.filter(
          (file) => file._id !== action.payload.id
        );
        toast.success("File deleted!");
      })
      .addCase(deleteMedicalFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export default medicalFileSlice.reducer;
