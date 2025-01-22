import { BoxesResDto } from "../../boxes/dto";
export interface BoxesPlaceDto {
  id_control_boxes: number;
  name: string;
  date_arrive: string;
  concluded: boolean;
  hasLiquid: boolean;
}

export interface BoxesPlaceResDto extends BoxesPlaceDto {
  id: number;
  boxes: BoxesResDto[];
}
