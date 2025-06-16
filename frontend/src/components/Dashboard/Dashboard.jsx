import React from "react";
import MedicalFilesDisplay from "../MedicalFilesDisplay/MedicalFilesDisplay";
import MedicalFilesUpload from "../MedicalFilesUpload/MedicalFilesUpload";
import NavbarComponent from "../Navbar/NavbarComponent"
import UserDetails from "../UserDetails/UserDetails";

export default function Dashboard() {
  
  return (
    <div>
      <NavbarComponent />
      <div className="mt-4 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <UserDetails/>
          <MedicalFilesUpload/>
        </div>
        <MedicalFilesDisplay/>
      </div>
    </div>
  );
}
