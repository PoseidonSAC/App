import { Outlet, Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../../../auth/context/useContext";

export interface ProtectedRoutesProps {
  children: ReactNode | null;
}

export const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children ? children : <Outlet />;
};
