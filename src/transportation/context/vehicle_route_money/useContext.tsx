import { useContext } from "react";
import { VehicleRouteMoneyContext } from "./context";
export const useVehicleRouteMoney = () => {
  const context = useContext(VehicleRouteMoneyContext);
  if (!context) {
    throw new Error(
      "useVehicleRouteMoney must be used within a VehicleRouteMoneyProvider"
    );
  }
  return context;
};
