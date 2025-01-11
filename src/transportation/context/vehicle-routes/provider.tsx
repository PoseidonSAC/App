import { VehicleRoutesContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";
import { useEffect, useState } from "react";
import {
  VehicleRoutesDto,
  VehicleRoutesResDto,
} from "../../dto/vehicle-routes";
import { VehicleRoutesService } from "../../services/vehicle_routes.service";
import { useVehicleRoute } from "../vehicle-route/useContext";
export const VehicleRoutesProvider = ({ children }: ContextProviderProps) => {
  const [vehicleRoutes, setVehicleRoutes] = useState<VehicleRoutesResDto[]>([]);
  const [vehicleRoutesSelected, setVehicleRoutesSelected] =
    useState<VehicleRoutesResDto | null>(null);
  const { routeSelected } = useVehicleRoute();
  const service = new VehicleRoutesService();
  useEffect(() => {
    const getRoutes = async () => {
      if (routeSelected) {
        const data = await service.getByVehicleRouteId(routeSelected.id);
        setVehicleRoutes(data);
      }
    };
    getRoutes();
  }, [routeSelected]);

  const createRoute = async (route: VehicleRoutesDto) => {
    const data = await service.create(route);
    setVehicleRoutes([...vehicleRoutes, data]);
  };

  const updateRoute = async (id: number, route: VehicleRoutesDto) => {
    await service.update(id, route);
    setVehicleRoutes((prevRoutes) =>
      prevRoutes.map((r) => (r.id === id ? { ...r, ...route } : r))
    );
  };

  const deleteRoute = async (id: number) => {
    await service.delete(id);
    setVehicleRoutes(vehicleRoutes.filter((r) => r.id !== id));
  };

  const getRoute = async (id: number): Promise<VehicleRoutesResDto> => {
    const data = await service.getById(id);
    return data;
  };

  return (
    <VehicleRoutesContext.Provider
      value={{
        vehicleRoutes,
        updateRoute,
        deleteRoute,
        createRoute,
        getRoute,
        vehicleRoutesSelected,
        setVehicleRoutesSelected,
      }}
    >
      {children}
    </VehicleRoutesContext.Provider>
  );
};
