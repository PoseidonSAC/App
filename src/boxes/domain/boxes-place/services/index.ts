import { api } from "../../../../core/api";
import { BoxesPlaceDto, BoxesPlaceResDto } from "../dto";
export class BoxesPlaceService {
  private apiURL = "/boxes/boxes-place";

  async getAll(): Promise<BoxesPlaceResDto[]> {
    const response = await api.get(`${this.apiURL}`);
    return response.data;
  }

  async getById(id: number): Promise<BoxesPlaceDto> {
    const response = await api.get(`${this.apiURL}/${id}`);
    return response.data;
  }

  async create(data: BoxesPlaceDto): Promise<void> {
    await api.post(`${this.apiURL}`, data);
    return;
  }

  async update(id: number, data: BoxesPlaceDto): Promise<void> {
    await api.put(`${this.apiURL}/${id}`, data);
    return;
  }

  async delete(id: number): Promise<void> {
    const response = await api.delete(`${this.apiURL}/${id}`);
    return response.data;
  }

  async getByIdControlBoxes(id: number): Promise<BoxesPlaceResDto[]> {
    const response = await api.get(`${this.apiURL}/control-boxes/${id}`);
    return response.data;
  }
}
