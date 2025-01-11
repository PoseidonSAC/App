import { createContext } from "react";
import {
  VehicleRouteOtherCostDto,
  VehicleRouteOtherCostResDto,
} from "./../../dto/other-cost";

export interface VehicleRouteOtherCostContextProps {
  costs: VehicleRouteOtherCostResDto[];
  updateCost: (id: number, cost: VehicleRouteOtherCostDto) => Promise<void>;
  deleteCost: (id: number) => Promise<void>;
  createCost: (cost: VehicleRouteOtherCostDto) => Promise<void>;
  getCost: (id: number) => Promise<VehicleRouteOtherCostResDto>;
  costSelected: VehicleRouteOtherCostResDto | null;
  setCostSelected: (cost: VehicleRouteOtherCostResDto | null) => void;
}

export const VehicleRouteOtherCostContext =
  createContext<VehicleRouteOtherCostContextProps | null>(null);
