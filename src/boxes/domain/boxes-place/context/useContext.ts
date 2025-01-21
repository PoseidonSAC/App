import { useContextCustom } from "../../../../shared/utils/useContextCustom";
import { BoxesPlaceContext } from "./context";

export const useBoxesPlace = () => {
  return useContextCustom(
    BoxesPlaceContext,
    "useBosexPlace must be used within an BoxesPlaceProvider"
  );
};
