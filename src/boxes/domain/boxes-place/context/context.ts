import { createContext } from "react";

import { BoxesPlaceDto, BoxesPlaceResDto } from "../dto";

export interface BoxesPlaceContextProps {
  boxesPlace: BoxesPlaceResDto[];
  update: (id: number, controlBoxes: BoxesPlaceDto) => Promise<void>;
  remove: (id: number) => Promise<void>;
  create: (controlBoxes: BoxesPlaceDto) => Promise<void>;
  boxesPlaceSelected: BoxesPlaceResDto | null;
  setBoxesPlaceSelected: (controlBoxes: BoxesPlaceResDto | null) => void;
  getControlBoxes: () => Promise<void>;
}

export const BoxesPlaceContext = createContext<BoxesPlaceContextProps | null>(
  null
);
