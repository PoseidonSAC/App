import { api } from "../../core/api";
import { travelDto } from "./../domain/dto/travel.dto";

export class TravelService {
  private apiURL = "/fishing/travel";

  async getAll() {
    const response = await api.get(this.apiURL);
    return response.data;
  }

  async getById(id: number) {
    const response = await api.get(`${this.apiURL}/${id}`);
    return response.data;
  }

  async create(data: travelDto) {
    const response = await api.post(this.apiURL, data);
    return response.data;
  }

  async update(id: number, data: travelDto) {
    const response = await api.put(`${this.apiURL}/${id}`, data);
    return response.data;
  }

  async delete(id: number) {
    const response = await api.delete(`${this.apiURL}/${id}`);
    return response.data;
  }
}
