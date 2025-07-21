import { createContext } from "react";

import { BoatDto } from "../../domain/dto/boat.dto";

export interface BoatContextProps {
  boat: BoatDto | null;
  update: (id: number, chargerOperation: BoatDto) => Promise<void>;
  setBoat: (chargerOperation: BoatDto | null) => void;
  create: (boat: BoatDto) => Promise<void>;
  getById: (id: number) => Promise<BoatDto>;
  boats: BoatDto[];
  remove: (id: number) => Promise<void>;
}

export const BoatContext = createContext<BoatContextProps | null>(null);
