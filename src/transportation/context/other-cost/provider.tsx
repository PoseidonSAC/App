import { VehicleRouteOtherCostContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";
import { useEffect, useState } from "react";
import {
  VehicleRouteOtherCostDto,
  VehicleRouteOtherCostResDto,
} from "../../dto/other-cost";
import { VehicleRouteOtherCostService } from "../../services/vehicle_route_other_cost.service";

import { useVehicleRoute } from "../vehicle-route";
export const VehicleRouteOtherCostProvider = ({
  children,
}: ContextProviderProps) => {
  const [costs, setCosts] = useState<VehicleRouteOtherCostResDto[]>([]);
  const [costSelected, setCostSelected] =
    useState<VehicleRouteOtherCostResDto | null>(null);
  const service = new VehicleRouteOtherCostService();
  const { routeSelected } = useVehicleRoute();
  useEffect(() => {
    const getRoutes = async () => {
      if (!routeSelected) return;
      const data = await service.getByVehicleRouteId(routeSelected.id);
      setCosts(data);
    };
    getRoutes();
  }, [routeSelected]);

  const createCost = async (route: VehicleRouteOtherCostDto) => {
    const data = await service.create(route);
    setCosts([...costs, data]);
  };

  const updateCost = async (id: number, route: VehicleRouteOtherCostDto) => {
    await service.update(id, route);
    setCosts((prevRoutes) =>
      prevRoutes.map((r) => (r.id === id ? { ...r, ...route } : r))
    );
  };

  const deleteCost = async (id: number) => {
    await service.delete(id);
    setCosts(costs.filter((r) => r.id !== id));
  };

  const getCost = async (id: number): Promise<VehicleRouteOtherCostResDto> => {
    const data = await service.getById(id);
    return data;
  };

  return (
    <VehicleRouteOtherCostContext.Provider
      value={{
        costs,
        createCost,
        updateCost,
        deleteCost,
        getCost,
        costSelected,
        setCostSelected,
      }}
    >
      {children}
    </VehicleRouteOtherCostContext.Provider>
  );
};
