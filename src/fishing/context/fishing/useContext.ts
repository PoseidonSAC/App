import { FishingContext } from "./context";
import { useContextCustom } from "../../../shared/utils/useContextCustom";

export const useFishing = () => {
  return useContextCustom(
    FishingContext,
    "useFishing must be used within an FishingProvider"
  );
};
