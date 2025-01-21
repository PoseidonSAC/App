import { createContext } from "react";

import { BoxesReturnDto, BoxesReturnResDto } from "../dto";

export interface BoxesReturnContextProps {
  boxesReturn: BoxesReturnResDto[];
  create: (boxesReturn: BoxesReturnDto) => Promise<void>;
  update: (id: number, boxesReturn: BoxesReturnDto) => Promise<void>;
  remove: (id: number) => Promise<void>;
  boxesReturnSelected: BoxesReturnResDto | null;
  setBoxesReturnSelected: (boxesReturn: BoxesReturnResDto | null) => void;
}

export const BoxesReturnContext = createContext<BoxesReturnContextProps | null>(
  null
);
