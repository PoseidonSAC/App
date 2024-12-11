import { ENV } from "../../core/constant/env";
import axios from "axios";
import { LoginDto } from "../domain/dto/login.dto";
import { LoginResDto } from "../domain/dto/login.res.dto";

export class AuthService {
  private apiUrl = ENV.API_URL;
  async login({ code, password }: LoginDto): Promise<LoginResDto> {
    const response = await axios.post(
      `${this.apiUrl}/auth/login`,
      {
        code,
        password,
      },
      {
        withCredentials: true,
      }
    );
    const data: LoginResDto = response.data;
    data.status = response.status;
    return data;
  }
  async validateToken(): Promise<LoginResDto | null> {
    const response = await axios.post(
      `${this.apiUrl}/auth/validate-token`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    const data: LoginResDto = response.data;
    data.status = response.status;
    return data;
  }

  async logout(): Promise<void> {
    await axios.post(
      `${this.apiUrl}/auth/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  }
}
