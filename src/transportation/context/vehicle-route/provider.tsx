import { VehicleRouteContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";
import { useEffect, useState } from "react";
import { VehicleRouteDto, VehicleRouteResDto } from "../../dto/vehicle-route";
import { VehicleRouteService } from "../../services/vehicle_route.service";
export const VehicleRouteProvider = ({ children }: ContextProviderProps) => {
  const [routes, setRoutes] = useState<VehicleRouteResDto[]>([]);
  const [routeSelected, setRouteSelected] = useState<VehicleRouteResDto | null>(
    null
  );
  const service = new VehicleRouteService();
  useEffect(() => {
    const getRoutes = async () => {
      const data = await service.getVehicleRoutes();

      const sortedData = data.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setRoutes(sortedData);
    };
    getRoutes();
  }, []);

  useEffect(() => {
    const sortedRoutes = [...routes].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    setRoutes(sortedRoutes);
  }, [routes]);

  const createRoute = async (route: VehicleRouteDto) => {
    const data = await service.create(route);
    setRoutes([...routes, data]);
  };

  const updateRoute = async (id: number, route: VehicleRouteDto) => {
    await service.update(id, route);

    setRoutes((prevRoutes) =>
      prevRoutes.map((r) => (r.id === id ? { ...r, ...route } : r))
    );
  };

  const deleteRoute = async (id: number) => {
    await service.delete(id);
    setRoutes(routes.filter((r) => r.id !== id));
  };

  const getRoute = async (id: number): Promise<VehicleRouteResDto> => {
    const data = await service.getById(id);
    return data;
  };

  return (
    <VehicleRouteContext.Provider
      value={{
        routes,
        updateRoute,
        deleteRoute,
        createRoute,
        getRoute,
        routeSelected,
        setRouteSelected,
      }}
    >
      {children}
    </VehicleRouteContext.Provider>
  );
};
