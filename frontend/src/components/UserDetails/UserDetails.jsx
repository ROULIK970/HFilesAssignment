import React, { useState } from 'react'
import { useSelector } from "react-redux";
import AvatarModal from "../AvatarModal/AvatarModal";
import ChangeUserDetailsModal from '../ChangeUserDetailsModal/ChangeUserDetailsModal';

export default function UserDetails() {
const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
const [isChangeAccountDetailsModalOpen, setIsChangeAccountDetailsModalOpen]= useState(false)

  const user = useSelector((state) => state.auth.user);
  console.log(user)
  return (
    <div className="bg-blue-100 shadow-md rounded-xl p-6 flex items-center gap-4">
      <div className="basis-3/12">
        <img
          src={user?.avatar}
          alt="User"
          className="w-full rounded-lg object-cover"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
          onClick={() => setIsAvatarModalOpen(true)}
        >
          Change Avatar
        </button>
        <AvatarModal
          isOpen={isAvatarModalOpen}
          onClose={() => setIsAvatarModalOpen(false)}
        />
      </div>

      <div className="basis-9/12">
        <h1 className="text-lg text-[#0331B5] font-semibold">
          {user?.fullName}.
        </h1>
        <p className="text-sm text-gray-700">Email : {user?.email}</p>
        <p className="text-sm text-gray-700">Phone : {user?.phoneNumber}</p>
        <p className="text-sm text-gray-700">Gender : {user?.gender}</p>
        <button
          className="bg-blue-600 text-white px-4 py-2 mt-7 rounded"
          onClick={() => setIsChangeAccountDetailsModalOpen(true)}
        >
          Update Account Details
        </button>
        <ChangeUserDetailsModal
          isOpen={isChangeAccountDetailsModalOpen}
          onClose={() => setIsChangeAccountDetailsModalOpen(false)}
        />
      </div>
    </div>
  );
}
