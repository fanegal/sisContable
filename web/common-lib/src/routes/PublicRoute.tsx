import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return !!sessionStorage.getItem("jwt");
};

export const PublicRoute = () => {
  return isAuthenticated() ? <Navigate to="/" replace /> : <Outlet />;
};


export default PublicRoute;
