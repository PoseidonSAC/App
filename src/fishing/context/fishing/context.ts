import { createContext } from "react";
import { FishingResDto, FishingDto } from "../../domain/dto/fishing.dto";

export interface FishingContextProps {
  fishings: FishingResDto[];
  create: (fishing: FishingDto) => Promise<void>;
  update: (id: number, fishing: FishingDto) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

export const FishingContext = createContext<FishingContextProps | null>(null);
