import { api } from "../../core/api";

import {
  VehicleRouteOtherCostDto,
  VehicleRouteOtherCostResDto,
} from "../dto/other-cost";

export class VehicleRouteOtherCostService {
  private apiURL = "/transportation/vehicle-route-other-costs";

  async getOtherCosts(): Promise<VehicleRouteOtherCostResDto[]> {
    const response = await api.get(this.apiURL);
    return response.data;
  }

  async getById(id: number): Promise<VehicleRouteOtherCostResDto> {
    const response = await api.get(`${this.apiURL}/${id}`);
    return response.data;
  }

  async create(
    data: VehicleRouteOtherCostDto
  ): Promise<VehicleRouteOtherCostResDto> {
    const response = await api.post(this.apiURL, data);
    return response.data;
  }

  async update(id: number, data: VehicleRouteOtherCostDto): Promise<void> {
    const response = await api.put(`${this.apiURL}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    const response = await api.delete(`${this.apiURL}/${id}`);
    return response.data;
  }

  async getByVehicleRouteId(
    id: number
  ): Promise<VehicleRouteOtherCostResDto[]> {
    const response = await api.get(`${this.apiURL}/vehicle-route/${id}`);
    return response.data;
  }
}
