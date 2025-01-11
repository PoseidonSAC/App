import { createContext } from "react";

import { BoxesDto, BoxesResDto } from "../dto";

export interface BoxesContextProps {
  boxes: BoxesResDto[];
  update: (id: number, boxes: BoxesDto) => Promise<void>;
  remove: (id: number) => Promise<void>;
  create: (boxes: BoxesDto) => Promise<void>;
  boxesSelected: BoxesResDto | null;
  setBoxesSelected: (boxes: BoxesResDto | null) => void;
}

export const BoxesContext = createContext<BoxesContextProps | null>(null);
