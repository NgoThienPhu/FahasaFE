import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRouter: React.FC<{children: JSX.Element}> = ({children}) => {
  const isAuth = true;
  if(!isAuth) return <Navigate to={"/auth"} replace />;
  return children;
}