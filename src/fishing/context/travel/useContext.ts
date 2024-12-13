import { TravelContext } from "./context";
import { useContextCustom } from "../../../shared/utils/useContextCustom";
export const useTravel = () => {
  return useContextCustom(
    TravelContext,
    "useTravel must be used within an TravelProvider"
  );
};
