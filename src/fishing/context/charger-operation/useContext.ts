import { useContextCustom } from "../../../shared/utils/useContextCustom";
import { ChargerOperationContext } from "./context";

export const useChargerOperation = () => {
  return useContextCustom(
    ChargerOperationContext,
    "useChargerOperation must be used within an useChargerOperationProvider"
  );
};
