export interface travelDto {
  code: string;
  oil_charge: number;
  oil_charger_price: number;
  oil_consume: number;
  oil_consume_price: number;
  provisions_cost: number;
  gas_cylinder_cost: number;
  createdAt: string;
}

export interface travelResDto {
  code: string;
  oil_charge: number;
  oil_charger_price: number;
  oil_consume: number;
  oil_consume_price: number;
  provisions_cost: number;
  gas_cylinder_cost: number;
  id: number;
  createdAt: string;
  updatedAt: string;
}
