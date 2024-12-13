import { Outlet, Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../../../auth/context/useContext";
import { Navbar } from "../../../shared/components/Navbar";

export interface ProtectedRoutesProps {
  children: ReactNode | null;
}

export const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  const hideNavbarRoutes = ["/inicio"];
  return children ? (
    children
  ) : (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar items={null} />}
      <Outlet />
    </>
  );
};
