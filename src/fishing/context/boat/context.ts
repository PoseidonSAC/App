import { createContext } from "react";
import { BoatResDto } from "../../domain/dto/boat.dto";

export interface BoatContextProps {
  boats: BoatResDto[];
  create: (boat: BoatResDto) => void;
  update: (id: number, boat: BoatResDto) => void;
  remove: (id: number) => void;
}

export const BoatContext = createContext<BoatContextProps | null>(null);
