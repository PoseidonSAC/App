import { useContext } from "react";
import { RoutesContext } from "./context";
export const useRoutes = () => {
  const context = useContext(RoutesContext);
  if (!context) {
    throw new Error("useRoutes must be used within an RoutesProvider");
  }
  return context;
};
