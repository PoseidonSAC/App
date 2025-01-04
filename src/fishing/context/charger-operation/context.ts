import { createContext } from "react";

import {
  ChargerOperationDto,
  ChargerOperationResDto,
} from "../../domain/dto/charger_operation.dto";

export interface ChargerOperationContextProps {
  chargerOperation: ChargerOperationResDto | null;
  getChargerOperationByTravelId: (id: number) => Promise<void>;
  update: (id: number, chargerOperation: ChargerOperationDto) => Promise<void>;
  setChargerOperation: (
    chargerOperation: ChargerOperationResDto | null
  ) => void;
}

export const ChargerOperationContext =
  createContext<ChargerOperationContextProps | null>(null);
