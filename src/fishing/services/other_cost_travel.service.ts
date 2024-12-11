import { ENV } from "../../core/constant/env";
import axios from "axios";
import { OtherCostTravelDto } from "./../domain/dto/other_cost_travel.dto";

export class OtherCostTravelService {
  private apiURL = ENV.API_URL + "/other-cost-travel";

  async getAll() {
    const response = await axios.get(this.apiURL);
    return response.data;
  }

  async getById(id: number) {
    const response = await axios.get(`${this.apiURL}/${id}`);
    return response.data;
  }

  async create(data: OtherCostTravelDto) {
    const response = await axios.post(this.apiURL, data);
    return response.data;
  }

  async update(id: number, data: OtherCostTravelDto) {
    const response = await axios.put(`${this.apiURL}/${id}`, data);
    return response.data;
  }

  async delete(id: number) {
    const response = await axios.delete(`${this.apiURL}/${id}`);
    return response.data;
  }
}
