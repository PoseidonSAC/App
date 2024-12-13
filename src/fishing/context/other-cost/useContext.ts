import { useContextCustom } from "../../../shared/utils/useContextCustom";
import { OtherCostTravelContext } from "./context";

export const useOtherCost = () => {
  return useContextCustom(
    OtherCostTravelContext,
    "useOtherCost must be used within an OtherCostProvider"
  );
};
