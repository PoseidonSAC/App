import { useContextCustom } from "../../../../shared/utils/useContextCustom";
import { BoxesContext } from "./context";

export const useBoxes = () => {
  return useContextCustom(
    BoxesContext,
    "useBoxes must be used within an BoxesProvider"
  );
};
