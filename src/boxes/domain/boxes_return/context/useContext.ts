import { useContextCustom } from "../../../../shared/utils/useContextCustom";
import { BoxesReturnContext } from "./context";

export const useBoxesReturn = () => {
  return useContextCustom(
    BoxesReturnContext,
    "useBoxesReturn must be used within an BoxesReturnProvider"
  );
};
