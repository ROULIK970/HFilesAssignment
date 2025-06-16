import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const email = sessionStorage.getItem("email")
  return email ? <Outlet /> : <Navigate to="/login" />;
}
