import { api } from "../../core/api";

import { VehicleRoutesDto, VehicleRoutesResDto } from "../dto/vehicle-routes";

export class VehicleRoutesService {
  private apiURL = "/transportation/vehicle-routes";

  async getVehiclesRoutes() {
    const response = await api.get(this.apiURL);
    return response.data;
  }

  async getById(id: number): Promise<VehicleRoutesResDto> {
    const response = await api.get(`${this.apiURL}/${id}`);
    return response.data;
  }

  async create(data: VehicleRoutesDto): Promise<VehicleRoutesResDto> {
    const response = await api.post(this.apiURL, data);
    return response.data;
  }

  async update(id: number, data: VehicleRoutesDto): Promise<void> {
    const response = await api.put(`${this.apiURL}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    const response = await api.delete(`${this.apiURL}/${id}`);
    return response.data;
  }

  async getByVehicleRouteId(id: number): Promise<VehicleRoutesResDto[]> {
    const response = await api.get(`${this.apiURL}/vehicle-route/${id}`);
    return response.data;
  }
}
