import { createContext } from "react";
import { FishingResDto, FishingDto } from "../../domain/dto/fishing.dto";

export interface FishingContextProps {
  fishings: FishingResDto[];
  create: (fishing: FishingResDto) => void;
  update: (id: number, fishing: FishingDto) => void;
  remove: (id: number) => void;
}

export const FishingContext = createContext<FishingContextProps | null>(null);
