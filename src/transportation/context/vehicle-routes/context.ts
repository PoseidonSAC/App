import { createContext } from "react";
import {
  VehicleRoutesDto,
  VehicleRoutesResDto,
} from "./../../dto/vehicle-routes";
export interface VehicleRoutesContextProps {
  vehicleRoutes: VehicleRoutesResDto[];
  updateRoute: (id: number, route: VehicleRoutesDto) => Promise<void>;
  deleteRoute: (id: number) => Promise<void>;
  createRoute: (route: VehicleRoutesDto) => Promise<void>;
  getRoute: (id: number) => Promise<VehicleRoutesResDto>;
  vehicleRoutesSelected: VehicleRoutesResDto | null;
  setVehicleRoutesSelected: (route: VehicleRoutesResDto | null) => void;
}

export const VehicleRoutesContext =
  createContext<VehicleRoutesContextProps | null>(null);
