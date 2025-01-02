import { createContext } from "react";

export interface ChargerOperationContextProps {
  chargers: ChargerResDto[];
  create: (charger: ChargerDto) => void;
  update: (id: number, charger: ChargerDto) => void;
  remove: (id: number) => void;
}

export const PescaContext = createContext<ChargerOperationContextProps | null>(
  null
);
