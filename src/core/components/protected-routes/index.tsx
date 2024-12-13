import { Outlet, Navigate, useLocation } from "react-router-dom";
import { ReactNode, useState, useEffect } from "react";
import { useAuth } from "../../../auth/context/useContext";
import { Navbar } from "../../../shared/components/Navbar";

export interface ProtectedRoutesProps {
  children?: ReactNode;
}

export const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const hideNavbarRoutes = ["/inicio", "/"];
    setShowNavbar(!hideNavbarRoutes.includes(location.pathname));
  }, [location.pathname]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children ? (
    children
  ) : (
    <>
      {showNavbar && <Navbar />}
      <Outlet />
    </>
  );
};
