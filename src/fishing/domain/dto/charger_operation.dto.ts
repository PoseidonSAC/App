export interface ChargerOperationDto {
  id_travel: number;
  footboard: number;
  helper: number;
  grocer: number;
  boxes: number;
  weight: number;
  charger: number;
  travel_cost: number;
  date_canceled: string | null;
}

export interface ChargerOperationCreateDto {
  id_travel: number;
}

export interface ChargerOperationResDto {
  id: number;
  footboard: number;
  helper: number;
  grocer: number;
  boxes: number;
  weight: number;
  charger: number;
  travel_cost: number;
  date_canceled: string | null;
}
