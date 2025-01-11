export interface BoxesDto {
  color: string;
  name: string;
  quantity: number;
  reported_by: string;
  id_control_boxes: number;
  createdAt: string;
  hasLiquid: boolean;
}

export interface BoxesResDto {
  id: number;
  color: string;
  name: string;
  quantity: number;
  reported_by: string;
  id_control_boxes: number;
  createdAt: string;
  hasLiquid: boolean;
}
