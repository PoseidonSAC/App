import { api } from "../../core/api";

import {
  VehicleRouteDetailDto,
  VehicleRouteDetailResDto,
} from "../dto/vehicle_route_detail";

export class VehicleRouteDetailService {
  private apiURL = "/transportation/vehicle-route-details";

  async getDetails(): Promise<VehicleRouteDetailResDto[]> {
    const response = await api.get(this.apiURL);
    return response.data;
  }

  async getById(id: number): Promise<VehicleRouteDetailResDto> {
    const response = await api.get(`${this.apiURL}/${id}`);
    return response.data;
  }

  async create(data: VehicleRouteDetailDto): Promise<VehicleRouteDetailResDto> {
    const response = await api.post(this.apiURL, data);
    return response.data;
  }

  async update(id: number, data: VehicleRouteDetailDto): Promise<void> {
    const response = await api.put(`${this.apiURL}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    const response = await api.delete(`${this.apiURL}/${id}`);
    return response.data;
  }

  async getByVehicleRouteId(
    id: number
  ): Promise<VehicleRouteDetailResDto | null> {
    const response = await api.get(`${this.apiURL}/vehicle-route/${id}`);
    return response.data;
  }
}
