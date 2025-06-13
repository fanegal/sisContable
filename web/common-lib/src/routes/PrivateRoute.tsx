import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return !!sessionStorage.getItem("jwt");
};

export const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
