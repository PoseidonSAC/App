import { createContext } from "react";

import { BoxesReturnDto, BoxesReturnResDto, BoxesReturnGrouped } from "../dto";

export interface BoxesReturnContextProps {
  boxesReturn: BoxesReturnGrouped | null;
  create: (boxesReturn: BoxesReturnDto) => Promise<void>;
  update: (id: number, boxesReturn: BoxesReturnDto) => Promise<void>;
  remove: (id: number) => Promise<void>;
  boxesReturnSelected: BoxesReturnResDto | null;
  setBoxesReturnSelected: (boxesReturn: BoxesReturnResDto | null) => void;
}

export const BoxesReturnContext = createContext<BoxesReturnContextProps | null>(
  null
);
