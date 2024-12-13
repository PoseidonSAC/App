import { BoatContext } from "./context";
import { useContextCustom } from "../../../shared/utils/useContextCustom";

export const useBoat = () => {
  return useContextCustom(
    BoatContext,
    "useBoat must be used within an BoatProvider"
  );
};
