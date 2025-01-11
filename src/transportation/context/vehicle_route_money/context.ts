import { createContext } from "react";
import {
  VehicleRouteMoneyDto,
  VehicleRouteMoneyResDto,
} from "./../../dto/vehicle_route_money";
export interface VehicleRouteMoneyContextProps {
  routesMoney: VehicleRouteMoneyResDto[];
  updateRouteMoney: (id: number, route: VehicleRouteMoneyDto) => Promise<void>;
  deleteRouteMoney: (id: number) => Promise<void>;
  createRouteMoney: (route: VehicleRouteMoneyDto) => Promise<void>;
  getRouteMoney: (id: number) => Promise<VehicleRouteMoneyResDto>;
  routeMoneySelected: VehicleRouteMoneyResDto | null;
  setRouteMoneySelected: (route: VehicleRouteMoneyResDto | null) => void;
}

export const VehicleRouteMoneyContext =
  createContext<VehicleRouteMoneyContextProps | null>(null);
