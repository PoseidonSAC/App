import { VehicleRouteDetailContext } from "./context";
import { ContextProviderProps } from "../../../shared/types/contextProviderProps";
import { useEffect, useState } from "react";
import {
  VehicleRouteDetailDto,
  VehicleRouteDetailResDto,
} from "../../dto/vehicle_route_detail";
import { VehicleRouteDetailService } from "../../services/vehicle_route_detail.service";
import { useVehicleRoute } from "../vehicle-route";
export const RoutesDetailProvider = ({ children }: ContextProviderProps) => {
  const [routeDetail, setRouteDetail] =
    useState<VehicleRouteDetailResDto | null>(null);
  const service = new VehicleRouteDetailService();
  const { routeSelected } = useVehicleRoute();
  useEffect(() => {
    const getRouteDetail = async () => {
      if (!routeSelected) return;
      const data = await service.getByVehicleRouteId(routeSelected.id);
      setRouteDetail(data);
    };
    getRouteDetail();
  }, [routeSelected]);

  const updateRoute = async (id: number, route: VehicleRouteDetailDto) => {
    await service.update(id, route);
    setRouteDetail((prevRoute) =>
      prevRoute?.id === id ? { ...prevRoute, ...route } : prevRoute
    );
  };

  const getRoute = async (id: number): Promise<VehicleRouteDetailResDto> => {
    const data = await service.getById(id);
    return data;
  };

  const VehicleUsegeOilByDestination = async (destination: string) => {
    const data = await service.getVehicleRouteUseOilDestiny(destination);
    return data;
  };

  const GetNextRoute = async (
    id: number
  ): Promise<VehicleRouteDetailResDto> => {
    const data = await service.getById(id);
    return data;
  };

  return (
    <VehicleRouteDetailContext.Provider
      value={{
        routeDetail,
        updateRoute,
        getRoute,
        setRouteDetail,
        VehicleUsegeOilByDestination,
        GetNextRoute,
      }}
    >
      {children}
    </VehicleRouteDetailContext.Provider>
  );
};
