import { createContext } from "react";
import {
  VehicleRouteDetailDto,
  VehicleRouteDetailResDto,
  VehicleRouteDetailUseOilDestiny,
} from "./../../dto/vehicle_route_detail";
export interface VehicleRouteDetailContextProps {
  routeDetail: VehicleRouteDetailResDto | null;
  updateRoute: (id: number, route: VehicleRouteDetailDto) => Promise<void>;
  getRoute: (id: number) => Promise<VehicleRouteDetailResDto>;
  setRouteDetail: (route: VehicleRouteDetailResDto | null) => void;
  VehicleUsegeOilByDestination: (
    destination: string
  ) => Promise<VehicleRouteDetailUseOilDestiny[]>;
  GetNextRoute: (id: number) => Promise<VehicleRouteDetailResDto>;
}

export const VehicleRouteDetailContext =
  createContext<VehicleRouteDetailContextProps | null>(null);
