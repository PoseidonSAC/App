import { api } from "../../core/api";
import { OtherCostTravelDto } from "./../domain/dto/other_cost_travel.dto";
export class OtherCostTravelService {
  private apiURL = "/fishing/other-cost-travel";

  async getAll() {
    const response = await api.get(this.apiURL);
    return response.data;
  }

  async getById(id: number) {
    const response = await api.get(`${this.apiURL}/${id}`);
    return response.data;
  }

  async create(data: OtherCostTravelDto) {
    const response = await api.post(this.apiURL, data);
    return response.data;
  }

  async update(id: number, data: OtherCostTravelDto) {
    const response = await api.put(`${this.apiURL}/${id}`, data);
    return response.data;
  }

  async delete(id: number) {
    const response = await api.delete(`${this.apiURL}/${id}`);
    return response.data;
  }

  async getOtherCostTravelByTravelId(id: number) {
    const response = await api.get(`${this.apiURL}/travel/${id}`);
    return response.data;
  }
}
