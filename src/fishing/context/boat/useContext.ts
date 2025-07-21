import { useContextCustom } from "../../../shared/utils/useContextCustom";
import { BoatContext } from "./context";

export const useBoat = () => {
  return useContextCustom(
    BoatContext,
    "useChargerOperation must be used within an useChargerOperationProvider"
  );
};
