import { useContext } from "react";
import { VehicleRouteBalanceContext } from "./context";
export const useRouteBalance = () => {
  const context = useContext(VehicleRouteBalanceContext);
  if (!context) {
    throw new Error(
      "useRouteBalance must be used within a VehicleRouteBalanceProvider"
    );
  }
  return context;
};
