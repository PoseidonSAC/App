import { useContext } from "react";
import { VehicleRouteDetailContext } from "./context";
export const useRouteDetail = () => {
  const context = useContext(VehicleRouteDetailContext);
  if (!context) {
    throw new Error(
      "useRouteDetail must be used within a VehicleRouteDetailProvider"
    );
  }
  return context;
};
