import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface ProtectedRouterProps {
  redirectIfAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRouter: React.FC<ProtectedRouterProps> = ({
  redirectIfAuth = false,
  children,
}) => {
  const { isAuth } = useAuth();

  if (redirectIfAuth && isAuth) {
    return <Navigate to="/" replace />;
  }

  if (!redirectIfAuth && !isAuth) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};