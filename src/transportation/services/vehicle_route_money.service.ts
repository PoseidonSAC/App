import { api } from "../../core/api";

import {
  VehicleRouteMoneyDto,
  VehicleRouteMoneyResDto,
} from "../dto/vehicle_route_money";

export class VehicleRouteMoneyService {
  private apiURL = "/transportation/vehicle-route-money";

  async getMoneys(): Promise<VehicleRouteMoneyResDto[]> {
    const response = await api.get(this.apiURL);
    return response.data;
  }

  async getById(id: number): Promise<VehicleRouteMoneyResDto> {
    const response = await api.get(`${this.apiURL}/${id}`);
    return response.data;
  }

  async create(data: VehicleRouteMoneyDto): Promise<VehicleRouteMoneyResDto> {
    const response = await api.post(this.apiURL, data);
    return response.data;
  }

  async update(id: number, data: VehicleRouteMoneyDto): Promise<void> {
    const response = await api.put(`${this.apiURL}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    const response = await api.delete(`${this.apiURL}/${id}`);
    return response.data;
  }

  async getByVehicleRouteId(id: number): Promise<VehicleRouteMoneyResDto[]> {
    const response = await api.get(`${this.apiURL}/vehicle-route/${id}`);
    return response.data;
  }
}
