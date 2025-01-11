import { VehicleRouteBalanceContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";
import { useEffect, useState } from "react";
import {
  VehicleRouteBalanceDto,
  VehicleRouteBalanceResDto,
} from "../../dto/vehicle_route_balance";
import { useVehicleRoute } from "../vehicle-route";
import { VehicleRouteBalanceService } from "../../services/vehicle_route_balance.service";
export const RoutesBalanceProvider = ({ children }: ContextProviderProps) => {
  const [vehicleRouteBalance, setVehicleRouteBalance] = useState<
    VehicleRouteBalanceResDto[]
  >([]);
  const [vehicleRouteBalanceSelected, setVehicleRouteBalanceSelected] =
    useState<VehicleRouteBalanceResDto | null>(null);
  const service = new VehicleRouteBalanceService();
  const { routeSelected } = useVehicleRoute();
  useEffect(() => {
    const getRoutes = async () => {
      if (!routeSelected) return;
      const data = await service.getByVehicleRouteId(routeSelected.id);
      setVehicleRouteBalance(data);
    };
    getRoutes();
  }, [routeSelected]);

  const createVehicleRouteBalance = async (route: VehicleRouteBalanceDto) => {
    const data = await service.create(route);
    setVehicleRouteBalance([...vehicleRouteBalance, data]);
  };

  const updateVehicleRouteBalance = async (
    id: number,
    route: VehicleRouteBalanceDto
  ) => {
    await service.update(id, route);
    setVehicleRouteBalance((prevRoutes) =>
      prevRoutes.map((r) => (r.id === id ? { ...r, ...route } : r))
    );
  };

  const deleteVehicleRouteBalance = async (id: number) => {
    await service.delete(id);
    setVehicleRouteBalance(vehicleRouteBalance.filter((r) => r.id !== id));
  };

  const getVehicleRouteBalance = async (
    id: number
  ): Promise<VehicleRouteBalanceResDto> => {
    const data = await service.getById(id);
    return data;
  };

  return (
    <VehicleRouteBalanceContext.Provider
      value={{
        vehicleRouteBalance,
        updateVehicleRouteBalance,
        deleteVehicleRouteBalance,
        createVehicleRouteBalance,
        getVehicleRouteBalance,
        vehicleRouteBalanceSelected,
        setVehicleRouteBalanceSelected,
      }}
    >
      {children}
    </VehicleRouteBalanceContext.Provider>
  );
};
