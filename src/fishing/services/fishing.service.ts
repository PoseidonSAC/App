import { FishingDto } from "./../domain/dto/fishing.dto";
import { api } from "../../core/api";

export class FishingService {
  private apiURL = "/fishing/fishing";

  async getAll() {
    const response = await api.get(this.apiURL);
    return response.data;
  }

  async getById(id: number) {
    const response = await api.get(`${this.apiURL}/${id}`);
    return response.data;
  }

  async create(data: FishingDto) {
    const response = await api.post(this.apiURL, data);
    return response.data;
  }

  async update(id: number, data: FishingDto) {
    const response = await api.put(`${this.apiURL}/${id}`, data);
    return response.data;
  }

  async delete(id: number) {
    const response = await api.delete(`${this.apiURL}/${id}`);
    return response.data;
  }

  async getFishingByTravelId(id: number) {
    const response = await api.get(`${this.apiURL}/travel/${id}`);
    return response.data;
  }
}
