import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMedicalFiles,
  deleteMedicalFile,
} from "../../features/medicalFile/medicalFileSlice";
import { toast } from "react-toastify";

export default function MedicalFilesDisplay() {
  const dispatch = useDispatch();
  const { files, loading, error } = useSelector((state) => state.medicalFiles);

  useEffect(() => {
    dispatch(fetchMedicalFiles());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      try {
        await dispatch(deleteMedicalFile(id)).unwrap();
        toast.success("File deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete file");
      }
    }
  };

  return (
    <div className="mt-10 px-6 pb-12">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Your Uploaded Medical Files
      </h2>

      {loading && <p className="text-center text-blue-600">Loading files...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && files.length === 0 && (
        <p className="text-center text-gray-500">No files uploaded yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file) => (
          <div
            key={file._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <img
                src={`https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/pg_1,w_300/${file.public_id}.jpg`}
                alt="PDF Preview"
                className="w-48 h-64 object-cover rounded shadow"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {file.fileName}
              </h3>
              <p className="text-sm text-gray-500">{file.fileType}</p>
            </div>

            <div className="mt-4 flex justify-between">
              <a
                href={file.fileURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View File
              </a>
              <button
                onClick={() => handleDelete(file._id)}
                className="text-sm px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
