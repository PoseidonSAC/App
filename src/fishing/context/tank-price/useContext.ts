import { TankPriceContext } from "./context";
import { useContextCustom } from "../../../shared/utils/useContextCustom";

export const useTankPrice = () =>
  useContextCustom(
    TankPriceContext,
    "useTankPrice must be used within a TankPriceProvider"
  );

