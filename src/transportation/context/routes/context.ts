import { createContext } from "react";
import { RouteDto, RouteResDto } from "./../../dto/routes/index";
export interface RoutesContextProps {
  routes: RouteResDto[];
  updateRoute: (id: number, route: RouteDto) => Promise<void>;
  deleteRoute: (id: number) => Promise<void>;
  createRoute: (route: RouteDto) => Promise<void>;
  getRoute: (id: number) => Promise<RouteResDto>;
  routeSelected: RouteResDto | null;
  setRouteSelected: (route: RouteResDto | null) => void;
}

export const RoutesContext = createContext<RoutesContextProps | null>(null);
