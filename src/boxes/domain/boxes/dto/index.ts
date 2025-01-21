import { BoxesReturnResDto } from "../../boxes_return/dto";
export interface BoxesDto {
  color: string;
  name: string;
  quantity: number;
  id_control_place: number;
}

export interface BoxesResDto {
  id: number;
  color: string;
  name: string;
  quantity: number;
  id_control_place: number;
  boxesReturn: BoxesReturnResDto[];
}
