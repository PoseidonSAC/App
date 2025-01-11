import { useContext } from "react";
import { VehicleRouteOtherCostContext } from "./context";
export const useRoutesOtherCost = () => {
  const context = useContext(VehicleRouteOtherCostContext);
  if (!context) {
    throw new Error(
      "useRoutesOtherCost must be used within a VehicleRouteOtherCostProvider"
    );
  }
  return context;
};
