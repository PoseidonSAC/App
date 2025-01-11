import { VehicleContext } from "./context";
import { useContextCustom } from "../../../shared/utils/useContextCustom";

export const useVehicle = () => {
  return useContextCustom(
    VehicleContext,
    "useVehicle must be used within an VehicleProvider"
  );
};
