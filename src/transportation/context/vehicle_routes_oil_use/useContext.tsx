import { useContext } from "react";
import { VehicleRoutesOilUseContext } from "./context";
export const useVehicleRoutesOil = () => {
  const context = useContext(VehicleRoutesOilUseContext);
  if (!context) {
    throw new Error(
      "useVehicleRoutesOil must be used within an VehicleRoutesOilUseProvider"
    );
  }
  return context;
};
