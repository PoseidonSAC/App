import { createContext } from "react";

export interface TankPriceContextProps {
  price: number;
  setPrice: (price: number) => void;
}

export const TankPriceContext = createContext<TankPriceContextProps | null>(
  null
);

