import { createContext } from "react";
import {
  VehicleRoutesOilUseDto,
  VehicleRoutesOilUseResDto,
} from "./../../dto/vehicle_routes_oil_use";
export interface VehicleRoutesOilUseContextProps {
  routesOilUse: VehicleRoutesOilUseResDto[];
  updateRouteOilUse: (
    id: number,
    route: VehicleRoutesOilUseDto
  ) => Promise<void>;
  deleteRouteOilUse: (id: number) => Promise<void>;
  createRouteOilUse: (route: VehicleRoutesOilUseDto) => Promise<void>;
  getRouteOilUse: (id: number) => Promise<VehicleRoutesOilUseResDto>;
  routeOilUseSelected: VehicleRoutesOilUseResDto | null;
  setRouteOilUseSelected: (route: VehicleRoutesOilUseResDto | null) => void;
}

export const VehicleRoutesOilUseContext =
  createContext<VehicleRoutesOilUseContextProps | null>(null);
