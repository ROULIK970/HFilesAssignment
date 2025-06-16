import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  uploadMedicalFile,
  fetchMedicalFiles,
} from "../../features/medicalFile/medicalFileSlice.js";
import { toast } from "react-toastify";

const fileTypes = [
  "Prescription",
  "Test Report",
  "X-Ray",
  "MRI Scan",
  "CT Scan",
  "Blood Report",
];

const validationSchema = Yup.object().shape({
  fileType: Yup.string().required(),
  fileName: Yup.string().required(),
  medicalFile: Yup.mixed().required(),
});

export default function MedicalFilesUpload() {
  const dispatch = useDispatch();

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-4">
        Please add your medical records
      </h1>
      <Formik
        initialValues={{
          fileType: "",
          fileName: "",
          medicalFile: null,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          const formData = new FormData();
          formData.append("fileType", values.fileType);
          formData.append("fileName", values.fileName);
          formData.append("medicalFile", values.medicalFile);

          try {
            await dispatch(uploadMedicalFile(formData)).unwrap();
            toast.success("File uploaded successfully!");
            dispatch(fetchMedicalFiles());
            resetForm();
          } catch (err) {
            toast.error("Failed to upload file");
          }
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                File Type
              </label>
              <select
                name="fileType"
                value={values.fileType}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">-- Select File Type --</option>
                {fileTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                File Name
              </label>
              <input
                type="text"
                name="fileName"
                value={values.fileName}
                onChange={handleChange}
                placeholder="Enter file name"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Select File
              </label>
              <input
                type="file"
                name="medicalFile"
                onChange={(e) =>
                  setFieldValue("medicalFile", e.currentTarget.files[0])
                }
                className="w-full"
                required
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Upload
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
