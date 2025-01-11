import { useContext } from "react";
import { VehicleRoutesContext } from "./context";
export const useVehicleRoutes = () => {
  const context = useContext(VehicleRoutesContext);
  if (!context) {
    throw new Error(
      "useVehicleRoute must be used within an VehicleRouteProvider"
    );
  }
  return context;
};
