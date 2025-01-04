import { api } from "../../core/api";
import { ChargerOperationDto } from "./../domain/dto/charger_operation.dto";

export class ChargeOperationService {
  private apiURL = "/operation/charger-operation";

  async getById(id: number) {
    const response = await api.get(`${this.apiURL}/${id}`);
    return response.data;
  }
  async create(data: ChargerOperationDto) {
    const response = await api.post(this.apiURL, data);
    return response.data;
  }
  async update(id: number, data: ChargerOperationDto) {
    const response = await api.put(`${this.apiURL}/${id}`, data);
    return response.data;
  }
  async delete(id: number) {
    const response = await api.delete(`${this.apiURL}/${id}`);
    return response.data;
  }
  async getChargerOperationByTravelId(id: number) {
    const response = await api.get(`${this.apiURL}/travel/${id}`);
    return response.data;
  }
}
