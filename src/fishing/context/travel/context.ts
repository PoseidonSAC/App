import { createContext } from "react";
import { travelResDto, travelDto } from "../../domain/dto/travel.dto";

export interface TravelContextProps {
  travels: travelResDto[];
  create: (travel: travelDto) => void;
  update: (id: number, travel: travelDto) => void;
  remove: (id: number) => void;
  travelSelected: travelResDto | null;
  SetTravelSelected: (travel: travelResDto) => void;
}

export const TravelContext = createContext<TravelContextProps | null>(null);
