import { createContext } from "react";
import { VehicleRouteDto, VehicleRouteResDto } from "./../../dto/vehicle-route";
export interface VehicleRouteContextProps {
  routes: VehicleRouteResDto[];
  updateRoute: (id: number, route: VehicleRouteDto) => Promise<void>;
  deleteRoute: (id: number) => Promise<void>;
  createRoute: (route: VehicleRouteDto) => Promise<void>;
  getRoute: (id: number) => Promise<VehicleRouteResDto>;
  routeSelected: VehicleRouteResDto | null;
  setRouteSelected: (route: VehicleRouteResDto | null) => void;
  searchTerm: string;
  setSearchTerm: (search: string) => void;
  filteredRoutes: VehicleRouteResDto[];
  setFilteredRoutes: (routes: VehicleRouteResDto[]) => void;
  handleFilter: () => void;
  getRoutes: () => Promise<void>;
}

export const VehicleRouteContext =
  createContext<VehicleRouteContextProps | null>(null);
