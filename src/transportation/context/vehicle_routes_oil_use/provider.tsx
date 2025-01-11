import { VehicleRoutesOilUseContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";
import { useEffect, useState } from "react";
import {
  VehicleRoutesOilUseDto,
  VehicleRoutesOilUseResDto,
} from "../../dto/vehicle_routes_oil_use";
import { VehicleRoutesOilUseService } from "../../services/vehicle_routes_oil_use.service";
import { useVehicleRoute } from "../vehicle-route";

export const RoutesOilUseProvider = ({ children }: ContextProviderProps) => {
  const [routesOilUse, setRouteOilUse] = useState<VehicleRoutesOilUseResDto[]>(
    []
  );
  const [routeOilUseSelected, setRouteOilUseSelected] =
    useState<VehicleRoutesOilUseResDto | null>(null);
  const service = new VehicleRoutesOilUseService();
  const { routeSelected } = useVehicleRoute();
  useEffect(() => {
    const getRoutes = async () => {
      if (!routeSelected) return;
      const data = await service.getByVehicleRouteId(routeSelected.id);
      setRouteOilUse(data);
    };
    getRoutes();
  }, [routeSelected]);

  const createRouteOilUse = async (route: VehicleRoutesOilUseDto) => {
    const data = await service.create(route);
    setRouteOilUse([...routesOilUse, data]);
  };

  const updateRouteOilUse = async (
    id: number,
    route: VehicleRoutesOilUseDto
  ) => {
    await service.update(id, route);
    setRouteOilUse((prevRoutes) =>
      prevRoutes.map((r) => (r.id === id ? { ...r, ...route } : r))
    );
  };

  const deleteRouteOilUse = async (id: number) => {
    await service.delete(id);
    setRouteOilUse(routesOilUse.filter((r) => r.id !== id));
  };

  const getRouteOilUse = async (
    id: number
  ): Promise<VehicleRoutesOilUseResDto> => {
    const data = await service.getById(id);
    return data;
  };

  return (
    <VehicleRoutesOilUseContext.Provider
      value={{
        routesOilUse,
        updateRouteOilUse,
        deleteRouteOilUse,
        createRouteOilUse,
        getRouteOilUse,
        routeOilUseSelected,
        setRouteOilUseSelected,
      }}
    >
      {children}
    </VehicleRoutesOilUseContext.Provider>
  );
};
