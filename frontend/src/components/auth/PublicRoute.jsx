import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("sb-access-token");

  if (token) {
    return <Navigate to="/inventory" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;