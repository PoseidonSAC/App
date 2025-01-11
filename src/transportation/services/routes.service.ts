import { api } from "../../core/api";
import { RouteDto, RouteResDto } from "./../dto/routes";

export class RouteService {
  private apiURL = "/transportation/routes";

  async getVehicles() {
    const response = await api.get(this.apiURL);
    return response.data;
  }
  async getById(id: number): Promise<RouteResDto> {
    const response = await api.get(`${this.apiURL}/${id}`);
    return response.data;
  }
  async create(data: RouteDto): Promise<RouteResDto> {
    const response = await api.post(this.apiURL, data);
    return response.data;
  }
  async update(id: number, data: RouteDto): Promise<void> {
    const response = await api.put(`${this.apiURL}/${id}`, data);
    return response.data;
  }
  async delete(id: number): Promise<void> {
    const response = await api.delete(`${this.apiURL}/${id}`);
    return response.data;
  }
}
