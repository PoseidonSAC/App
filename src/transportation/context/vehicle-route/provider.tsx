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

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredRoutes, setFilteredRoutes] = useState<VehicleRouteResDto[]>(
    []
  );

  const service = new VehicleRouteService();
  useEffect(() => {
    const getRoutes = async () => {
      const data = await service.getVehicleRoutes();

      const sortedData = data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setRoutes(sortedData);
    };
    getRoutes();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [routes, searchTerm]);

  const createRoute = async (route: VehicleRouteDto) => {
    await service.create(route);
    getRoutes();
  };

  const updateRoute = async (id: number, route: VehicleRouteDto) => {
    await service.update(id, route);
    getRoutes();
  };

  const deleteRoute = async (id: number) => {
    await service.delete(id);
    setRoutes(routes.filter((r) => r.id !== id));
  };

  const getRoute = async (id: number): Promise<VehicleRouteResDto> => {
    const data = await service.getById(id);
    return data;
  };

  const handleFilter = () => {
    const filtered = routes.filter(
      (route) =>
        route.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.createdAt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRoutes(filtered);
  };

  const getRoutes = async () => {
    const data = await service.getVehicleRoutes();
    const sortedData = data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setRoutes(sortedData);
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
        searchTerm,
        setSearchTerm,
        filteredRoutes,
        setFilteredRoutes,
        handleFilter,
        getRoutes,
      }}
    >
      {children}
    </VehicleRouteContext.Provider>
  );
};
