import { api } from "../../core/api";
import { VehicleDto, VehicleRestDto } from "./../dto/vehicle";

export class VehicleService {
  private apiURL = "/operation/vehicle";

  async getVehicles() {
    const response = await api.get(this.apiURL);
    return response.data;
  }
  async getById(id: number): Promise<VehicleRestDto> {
    const response = await api.get(`${this.apiURL}/${id}`);
    return response.data;
  }
  async create(data: VehicleDto): Promise<VehicleRestDto> {
    const response = await api.post(this.apiURL, data);
    return response.data;
  }
  async update(id: number, data: VehicleDto): Promise<void> {
    const response = await api.put(`${this.apiURL}/${id}`, data);
    return response.data;
  }
  async delete(id: number): Promise<void> {
    const response = await api.delete(`${this.apiURL}/${id}`);
    return response.data;
  }
}
