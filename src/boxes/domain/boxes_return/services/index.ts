import { api } from "../../../../core/api";
import { BoxesReturnDto, BoxesReturnResDto } from "../dto";

export class BoxesReturnService {
  private apiURL = "/boxes/boxes-return";

  async getAll(): Promise<BoxesReturnResDto[]> {
    const response = await api.get(`${this.apiURL}`);
    return response.data;
  }

  async getById(id: number): Promise<BoxesReturnResDto> {
    const response = await api.get(`${this.apiURL}/${id}`);
    return response.data;
  }

  async create(data: BoxesReturnDto): Promise<BoxesReturnResDto> {
    const response = await api.post(`${this.apiURL}`, data);
    return response.data;
  }

  async update(id: number, data: BoxesReturnDto): Promise<void> {
    const response = await api.put(`${this.apiURL}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    const response = await api.delete(`${this.apiURL}/${id}`);
    return response.data;
  }

  async getBoxesByBoxes(id: number): Promise<BoxesReturnResDto[]> {
    const response = await api.get(`${this.apiURL}/boxes/${id}`);
    return response.data;
  }

  async getBoxesByControl(id: number): Promise<BoxesReturnResDto[]> {
    const response = await api.get(`${this.apiURL}/control-boxes/${id}`);
    return response.data;
  }
}
