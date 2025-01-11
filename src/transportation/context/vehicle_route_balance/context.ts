import { createContext } from "react";
import {
  VehicleRouteBalanceDto,
  VehicleRouteBalanceResDto,
} from "./../../dto/vehicle_route_balance";
export interface VehicleRouteBalanceContextProps {
  vehicleRouteBalance: VehicleRouteBalanceResDto[];
  updateVehicleRouteBalance: (
    id: number,
    vehicleRouteBalance: VehicleRouteBalanceDto
  ) => Promise<void>;
  deleteVehicleRouteBalance: (id: number) => Promise<void>;
  createVehicleRouteBalance: (
    vehicleRouteBalance: VehicleRouteBalanceDto
  ) => Promise<void>;
  getVehicleRouteBalance: (id: number) => Promise<VehicleRouteBalanceResDto>;
  vehicleRouteBalanceSelected: VehicleRouteBalanceResDto | null;
  setVehicleRouteBalanceSelected: (
    vehicleRouteBalance: VehicleRouteBalanceResDto | null
  ) => void;
}

export const VehicleRouteBalanceContext =
  createContext<VehicleRouteBalanceContextProps | null>(null);
