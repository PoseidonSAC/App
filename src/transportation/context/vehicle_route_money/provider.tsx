import { VehicleRouteMoneyContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";
import { useEffect, useState } from "react";
import {
  VehicleRouteMoneyDto,
  VehicleRouteMoneyResDto,
} from "../../dto/vehicle_route_money";
import { VehicleRouteMoneyService } from "../../services/vehicle_route_money.service";
import { useVehicleRoute } from "../vehicle-route";
export const RoutesMoneyProvider = ({ children }: ContextProviderProps) => {
  const [routesMoney, setRoutesMoney] = useState<VehicleRouteMoneyResDto[]>([]);
  const [routeMoneySelected, setRouteMoneySelected] =
    useState<VehicleRouteMoneyResDto | null>(null);
  const service = new VehicleRouteMoneyService();
  const { routeSelected } = useVehicleRoute();
  useEffect(() => {
    const getRoutes = async () => {
      if (!routeSelected) return;
      const data = await service.getByVehicleRouteId(routeSelected.id);
      setRoutesMoney(data);
    };
    getRoutes();
  }, [routeSelected]);

  const createRouteMoney = async (route: VehicleRouteMoneyDto) => {
    const data = await service.create(route);
    setRoutesMoney([...routesMoney, data]);
  };

  const updateRouteMoney = async (id: number, route: VehicleRouteMoneyDto) => {
    await service.update(id, route);
    setRoutesMoney((prevRoutes) =>
      prevRoutes.map((r) => (r.id === id ? { ...r, ...route } : r))
    );
  };

  const deleteRouteMoney = async (id: number) => {
    await service.delete(id);
    setRoutesMoney(routesMoney.filter((r) => r.id !== id));
  };

  const getRouteMoney = async (
    id: number
  ): Promise<VehicleRouteMoneyResDto> => {
    const data = await service.getById(id);
    return data;
  };

  return (
    <VehicleRouteMoneyContext.Provider
      value={{
        routesMoney,
        updateRouteMoney,
        deleteRouteMoney,
        createRouteMoney,
        getRouteMoney,
        routeMoneySelected,
        setRouteMoneySelected,
      }}
    >
      {children}
    </VehicleRouteMoneyContext.Provider>
  );
};
