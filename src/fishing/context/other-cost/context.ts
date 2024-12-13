import { createContext } from "react";

import { OtherCostTravelResDto } from "../../domain/dto/other_cost_travel.dto";

export interface OtherCostTravelContextProps {
  otherCostTravels: OtherCostTravelResDto[];
  create: (otherCostTravel: OtherCostTravelResDto) => void;
  update: (id: number, otherCostTravel: OtherCostTravelResDto) => void;
  remove: (id: number) => void;
}

export const OtherCostTravelContext =
  createContext<OtherCostTravelContextProps | null>(null);
