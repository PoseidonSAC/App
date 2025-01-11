import { useContext } from "react";
import { VehicleRouteContext } from "./context";
export const useVehicleRoute = () => {
  const context = useContext(VehicleRouteContext);
  if (!context) {
    throw new Error(
      "useVehicleRoutes must be used within an VehicleRoutesProvider"
    );
  }
  return context;
};
