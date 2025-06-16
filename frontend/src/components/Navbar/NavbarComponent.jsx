import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import hFilesLogo from "./hfiles.png"

export default function Navbar() {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector((state) => state.auth.user);


  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error || "Logout failed");
    }
  };


  return (
    <nav className="bg-[#0331B5] shadow-md px-4 py-3 flex flex-wrap items-center justify-between">

      <div className="w-32">
        <img src={hFilesLogo} alt="Logo" className="w-full h-auto" />
      </div>

     
      <div className="flex items-center space-x-3 mt-2 sm:mt-0">
        <span className="text-white text-sm sm:text-base max-w-[100px]">
          Welcome {user?.fullName}
        </span>

        <img
          src={user?.avatar}
          alt="User Avatar"
          className="w-9 h-9 rounded-full object-cover border"
        />

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
