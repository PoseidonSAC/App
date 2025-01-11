export interface VehicleRouteMoneyDto {
  id_vehicle_route: number;
  money: number;
  description: string;
  givenby: string;
  type: string;
}

export interface VehicleRouteMoneyResDto {
  id: number;
  id_vehicle_route: number;
  money: number;
  description: string;
  givenby: string;
  type: string;
}
