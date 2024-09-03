import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface PrivateRouteProps {
  redirectPath?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectPath = "/login",
}) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  // If not logged in, redirect to the login page
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  // If logged in, render the component
  return <Outlet />;
};

export default PrivateRoute;
