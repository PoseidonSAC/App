export interface VehicleRouteDetailDto {
  id_vehicle_route: number;
  dateInit: string;
  dateEnd: string | null;
  taxes_in: number;
  taxes_out: number;
  point_charge: string | null;
  who_destination: string | null;
  destiny: string | null;
}

export interface VehicleRouteDetailResDto {
  id: number;
  id_vehicle_route: number;
  dateInit: string;
  dateEnd: string | null;
  taxes_in: number;
  taxes_out: number;
  point_charge: string | null;
  who_destination: string | null;
  destiny: string | null;
}

export interface VehicleRouteDetailUseOilDestiny {
  id: number;
  id_vehicle_route: number;
  dateInit: string;
  point_charge: string | null;
  who_destination: string | null;
  destiny: string | null;
  vehicle: string;
  vehicle_route_oil_usage: number;
}
