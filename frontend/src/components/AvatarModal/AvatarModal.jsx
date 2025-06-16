import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAvatar } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

export default function AvatarModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select an image!");

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await dispatch(updateAvatar(formData)).unwrap();
      toast.success("Avatar updated!");
      onClose();
    } catch (err) {
      toast.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Update Avatar</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
