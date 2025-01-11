export interface VehicleRoutesOilUseDto {
  id_vehicle_route: number;
  oil_use: number;
  description: string;
}

export interface VehicleRoutesOilUseResDto {
  id: number;
  id_vehicle_route: number;
  oil_use: number;
  description: string;
}
