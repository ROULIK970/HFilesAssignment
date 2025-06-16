import MedicalFilesDisplay from "./components/MedicalFilesDisplay/MedicalFilesDisplay";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import UserDetails from "./components/UserDetails/UserDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import PageNotFound from "./components/PageNotFound/PageNotFound";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>

      {/* <NavbarComponent />
      <UserDetails/>
      <MedicalFilesDisplay /> */}
    </>
  );
}

export default App;
