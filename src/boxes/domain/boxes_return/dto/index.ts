export interface BoxesReturnDto {
  id_boxes: number;
  date: string;
  quantity: number;
}

export interface BoxesReturnResDto {
  id: number;
  id_boxes: number;
  date: string;
  quantity: number;
}

export interface BoxesReturnGrouped {
  [id_boxes: number]: BoxesReturnResDto[];
}
