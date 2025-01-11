import { api } from "../../core/api";

import {
  VehicleRoutesOilUseDto,
  VehicleRoutesOilUseResDto,
} from "../dto/vehicle_routes_oil_use";

export class VehicleRoutesOilUseService {
  private apiURL = "/transportation/vehicle-routes-oil-use";

  async getVehicles() {
    const response = await api.get(this.apiURL);
    return response.data;
  }
  async getById(id: number): Promise<VehicleRoutesOilUseResDto> {
    const response = await api.get(`${this.apiURL}/${id}`);
    return response.data;
  }
  async create(
    data: VehicleRoutesOilUseDto
  ): Promise<VehicleRoutesOilUseResDto> {
    const response = await api.post(this.apiURL, data);
    return response.data;
  }
  async update(id: number, data: VehicleRoutesOilUseDto): Promise<void> {
    const response = await api.put(`${this.apiURL}/${id}`, data);
    return response.data;
  }
  async delete(id: number): Promise<void> {
    const response = await api.delete(`${this.apiURL}/${id}`);
    return response.data;
  }

  async getByVehicleRouteId(id: number): Promise<VehicleRoutesOilUseResDto[]> {
    const response = await api.get(`${this.apiURL}/vehicle-route/${id}`);
    return response.data;
  }
}
