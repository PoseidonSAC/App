import { api } from "../../../../core/api";
import { ControlBoxesDto, ControlBoxesResDto } from "../dto";

export class ControlBoxesService {
  private apiURL = "/boxes/control-boxes";

  async getAll(): Promise<ControlBoxesResDto[]> {
    const response = await api.get(`${this.apiURL}`);
    return response.data;
  }

  async getById(id: number): Promise<ControlBoxesResDto> {
    const response = await api.get(`${this.apiURL}/${id}`);
    return response.data;
  }

  async create(data: ControlBoxesDto): Promise<ControlBoxesResDto> {
    const response = await api.post(`${this.apiURL}`, data);
    return response.data;
  }

  async update(id: number, data: ControlBoxesDto): Promise<void> {
    const response = await api.put(`${this.apiURL}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    const response = await api.delete(`${this.apiURL}/${id}`);
    return response.data;
  }
}
