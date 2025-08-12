import { LoginDto } from "../domain/dto/login.dto";
import { LoginResDto } from "../domain/dto/login.res.dto";
import { api } from "../../core/api";

export class AuthService {
  private apiUrl = "/auth";
  async login({ code, password }: LoginDto): Promise<LoginResDto> {
    const response = await api.post(`${this.apiUrl}/login`, {
      code,
      password,
    });
    const data: LoginResDto = response.data;
    data.status = response.status;
    return data;
  }
  async validateToken(): Promise<LoginResDto | null> {
    const response = await api.post(`${this.apiUrl}/validate-token`);
    const data: LoginResDto = response.data;
    data.status = response.status;
    return data;
  }

  async logout(): Promise<void> {
    await api.post(`${this.apiUrl}/logout`);
  }
}
