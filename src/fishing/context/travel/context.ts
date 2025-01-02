import { createContext } from "react";
import { travelResDto, travelDto } from "../../domain/dto/travel.dto";

export interface TravelContextProps {
  travels: travelResDto[];
  create: (travel: travelDto) => Promise<void>;
  update: (id: number, travel: travelDto) => Promise<void>;
  remove: (id: number) => Promise<void>;
  travelSelected: travelResDto | null;
  SetTravelSelected: (travel: travelResDto | null) => void;
}

export const TravelContext = createContext<TravelContextProps | null>(null);
