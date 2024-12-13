import { api } from "../../core/api";
import { BoatDto } from "./../domain/dto/boat.dto";

export class BoatService {
  private apiUrl = "/fishing/boat";
  async getAll() {
    const response = await api.get(this.apiUrl);
    return response.data;
  }

  async getById(id: number) {
    const response = await api.get(`${this.apiUrl}/${id}`);
    return response.data;
  }

  async create(data: BoatDto) {
    const response = await api.post(this.apiUrl, data);
    return response.data;
  }

  async update(id: number, data: BoatDto) {
    const response = await api.put(`${this.apiUrl}/${id}`, data);
    return response.data;
  }

  async delete(id: number) {
    const response = await api.delete(`${this.apiUrl}/${id}`);
    return response.data;
  }
}
