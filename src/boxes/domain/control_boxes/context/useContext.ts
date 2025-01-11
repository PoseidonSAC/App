import { useContextCustom } from "../../../../shared/utils/useContextCustom";
import { ControlBoxesContext } from "./context";

export const useControlBoxes = () => {
  return useContextCustom(
    ControlBoxesContext,
    "useControlBoxes must be used within an ControlBoxesProvider"
  );
};
