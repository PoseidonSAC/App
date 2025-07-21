import { BoatDto } from "./boat.dto";
import {
  ChargerOperationResDto,
  ChargerOperationDto,
} from "./charger_operation.dto";

export interface travelDto {
  id_boat: number;
  oil_charge: number;
  oil_charger_price: number;
  oil_consume: number;
  oil_consume_price: number;
  provisions_cost: number;
  gas_cylinder_cost: number;
  code: string;
  createdAt: string;
  is_concluded: boolean;
  oil_remaining: number;
  oil_date_canceled: string | null;
  fishing_date_canceled: string | null;
  oil_vehicle: number;
  oil_vehicle_price: number;
  oil_vehicle_date_canceled: string | null;
  charger_operation?: ChargerOperationDto;
  boat?: BoatDto;
}

export interface travelResDto {
  oil_charge: number;
  oil_charger_price: number;
  oil_consume: number;
  oil_consume_price: number;
  provisions_cost: number;
  gas_cylinder_cost: number;
  code: string;
  createdAt: string;
  is_concluded: boolean;
  oil_remaining: number;
  oil_date_canceled: string | null;
  fishing_date_canceled: string | null;
  oil_vehicle: number;
  oil_vehicle_price: number;
  oil_vehicle_date_canceled: string | null;
  id: number;
  charger_operation: ChargerOperationResDto;
  id_boat: number;
  boat: BoatDto;
}
