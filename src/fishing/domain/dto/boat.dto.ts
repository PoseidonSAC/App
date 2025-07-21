export interface BoatDto {
  id?: number;
  name: string;
}
export interface BoatResDto extends BoatDto {
  created_at: string;
  updated_at: string;
}
