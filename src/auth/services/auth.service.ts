import { ENV } from "../../core/constant/env";
import axios, { Axios } from "axios";
import { LoginDto } from "../domain/dto/login.dto";
import { LoginResDto } from "../domain/dto/login.res.dto";

export class AuthService {
  private apiUrl = ENV.API_URL;
  private api: Axios;
  constructor() {
    this.api = axios.create({
      baseURL: this.apiUrl,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async login({ code, password }: LoginDto): Promise<LoginResDto> {
    const response = await this.api.post(`${this.apiUrl}/auth/login`, {
      code,
      password,
    });
    const data: LoginResDto = response.data;
    data.status = response.status;
    return data;
  }
  async validateToken(): Promise<LoginResDto | null> {
    const response = await this.api.post(`${this.apiUrl}/auth/validate-token`);
    const data: LoginResDto = response.data;
    data.status = response.status;
    return data;
  }

  async logout(): Promise<void> {
    await this.api.post(`${this.apiUrl}/auth/logout`);
  }
}
