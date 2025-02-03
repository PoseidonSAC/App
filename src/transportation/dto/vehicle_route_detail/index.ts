export interface VehicleRouteDetailDto {
  id_vehicle_route: number;
  dateInit: string;
  dateEnd: string | null;
  taxes_in: number;
  taxes_out: number;
  destination: string | null;
}

export interface VehicleRouteDetailResDto {
  id: number;
  id_vehicle_route: number;
  dateInit: string;
  dateEnd: string | null;
  taxes_in: number;
  taxes_out: number;
  destination: string | null;
}

export interface VehicleRouteDetailUseOilDestiny {
  id: number;
  id_vehicle_route: number;
  dateInit: string;
  destination: string | null;
  vehicle: string;
  vehicle_route_oil_usage: number;
}
