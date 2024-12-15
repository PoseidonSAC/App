import { createContext } from "react";

import {
  OtherCostTravelResDto,
  OtherCostTravelDto,
} from "../../domain/dto/other_cost_travel.dto";

export interface OtherCostTravelContextProps {
  otherCostTravels: OtherCostTravelResDto[];
  create: (otherCostTravel: OtherCostTravelDto) => Promise<void>;
  update: (id: number, otherCostTravel: OtherCostTravelDto) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

export const OtherCostTravelContext =
  createContext<OtherCostTravelContextProps | null>(null);
