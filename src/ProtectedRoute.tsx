import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionStorageContext } from "./SessionStorageManager";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const sessionStorageManager = useContext(SessionStorageContext);
  const token = sessionStorageManager?.getToken();
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
