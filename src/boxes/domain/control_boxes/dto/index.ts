import { BoxesPlaceResDto } from "../../boxes-place/dto";
export interface ControlBoxesDto {
  code: string;
  date_arrive: string;
  concluded: boolean;
}

export interface ControlBoxesResDto {
  id: number;
  code: string;
  date_arrive: string;
  concluded: boolean;
  control_place: BoxesPlaceResDto[];
}
