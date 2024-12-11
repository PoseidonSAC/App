import { ENV } from "../../core/constant/env";
import axios from "axios";
import { travelDto } from "./../domain/dto/travel.dto";

export class TravelService {
  private apiURL = ENV.API_URL + "/travel";

  async getAll() {
    const response = await axios.get(this.apiURL);
    return response.data;
  }

  async getById(id: number) {
    const response = await axios.get(`${this.apiURL}/${id}`);
    return response.data;
  }

  async create(data: travelDto) {
    const response = await axios.post(this.apiURL, data);
    return response.data;
  }

  async update(id: number, data: travelDto) {
    const response = await axios.put(`${this.apiURL}/${id}`, data);
    return response.data;
  }

  async delete(id: number) {
    const response = await axios.delete(`${this.apiURL}/${id}`);
    return response.data;
  }
}
