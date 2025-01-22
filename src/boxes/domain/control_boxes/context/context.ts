import { createContext } from "react";

import { ControlBoxesDto, ControlBoxesResDto } from "../dto";

export interface ControlBoxesContextProps {
  controlBoxes: ControlBoxesResDto[];
  update: (id: number, controlBoxes: ControlBoxesDto) => Promise<void>;
  remove: (id: number) => Promise<void>;
  create: (controlBoxes: ControlBoxesDto) => Promise<void>;
  controlBoxesSelected: ControlBoxesResDto | null;
  setControlBoxesSelected: (controlBoxes: ControlBoxesResDto | null) => void;
  getControlBoxes: () => Promise<void>;
}

export const ControlBoxesContext =
  createContext<ControlBoxesContextProps | null>(null);
