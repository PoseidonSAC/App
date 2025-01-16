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
