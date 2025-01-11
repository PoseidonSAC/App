import { api } from "../../core/api";

import { VehicleRouteDto, VehicleRouteResDto } from "../dto/vehicle-route";

export class VehicleRouteService {
  private apiURL = "/transportation/vehicle-route";

  async getVehicleRoutes(): Promise<VehicleRouteResDto[]> {
    const response = await api.get(this.apiURL);
    return response.data;
  }

  async getById(id: number): Promise<VehicleRouteResDto> {
    const response = await api.get(`${this.apiURL}/${id}`);
    return response.data;
  }

  async create(data: VehicleRouteDto): Promise<VehicleRouteResDto> {
    const response = await api.post(this.apiURL, data);
    return response.data;
  }

  async update(id: number, data: VehicleRouteDto): Promise<void> {
    const response = await api.put(`${this.apiURL}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    const response = await api.delete(`${this.apiURL}/${id}`);
    return response.data;
  }
}
