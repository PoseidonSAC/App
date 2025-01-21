import { api } from "../../../../core/api";
import { BoxesDto, BoxesResDto } from "../dto";

export class BoxesService {
  private apiURL = "/boxes/boxes";

  async getAll(): Promise<BoxesResDto[]> {
    const response = await api.get(`${this.apiURL}`);
    console.log(response.data);
    return response.data;
  }

  async getById(id: number): Promise<BoxesResDto> {
    const response = await api.get(`${this.apiURL}/${id}`);
    return response.data;
  }

  async create(data: BoxesDto): Promise<BoxesResDto> {
    const response = await api.post(`${this.apiURL}`, data);
    return response.data;
  }

  async update(id: number, data: BoxesDto): Promise<void> {
    const response = await api.put(`${this.apiURL}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    const response = await api.delete(`${this.apiURL}/${id}`);
    return response.data;
  }

  async getBoxesByControlBoxes(id: number): Promise<BoxesResDto[]> {
    const response = await api.get(`${this.apiURL}/control-boxes/${id}`);
    return response.data;
  }
}
