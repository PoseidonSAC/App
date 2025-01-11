import { api } from "../../core/api";

import {
  VehicleRouteBalanceDto,
  VehicleRouteBalanceResDto,
} from "../dto/vehicle_route_balance";

export class VehicleRouteBalanceService {
  private apiURL = "/transportation/vehicle-route-balances";

  async getBalances(): Promise<VehicleRouteBalanceResDto[]> {
    const response = await api.get(this.apiURL);
    return response.data;
  }

  async getById(id: number): Promise<VehicleRouteBalanceResDto> {
    const response = await api.get(`${this.apiURL}/${id}`);
    return response.data;
  }

  async create(
    data: VehicleRouteBalanceDto
  ): Promise<VehicleRouteBalanceResDto> {
    const response = await api.post(this.apiURL, data);
    return response.data;
  }

  async update(id: number, data: VehicleRouteBalanceDto): Promise<void> {
    const response = await api.put(`${this.apiURL}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    const response = await api.delete(`${this.apiURL}/${id}`);
    return response.data;
  }

  async getByVehicleRouteId(id: number): Promise<VehicleRouteBalanceResDto[]> {
    const response = await api.get(`${this.apiURL}/vehicle-route/${id}`);
    return response.data;
  }
}
