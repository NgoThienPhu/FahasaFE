import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../../components/Loading/Loading";

interface ProtectedRouterProps {
  redirectIfAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRouter: React.FC<ProtectedRouterProps> = ({
  redirectIfAuth = false,
  children,
}) => {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (isAuth) {
    if (redirectIfAuth) return <Navigate to="/" replace />;
    return children;
  } else {
    if (redirectIfAuth) return children;
    return <Navigate to="/auth" replace />;
  }
  
};