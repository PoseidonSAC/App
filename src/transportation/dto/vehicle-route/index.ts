import { VehicleRouteDetailResDto } from "../vehicle_route_detail/index.ts";

export interface VehicleRouteDto {
  state: string;
  createdAt: string;
  id_vehicle: number;
  is_concluded: string;
}

export interface VehicleRouteResDto {
  id: number;
  state: string;
  createdAt: string;
  is_concluded: string;
  id_vehicle: number;
  vehicle: VehicleName;
  vehicle_route_detail: VehicleRouteDetailResDto | null;
}

export interface VehicleName {
  name: string;
}
