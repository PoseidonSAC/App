import axios from "axios";
import { ENV } from "../constant/env";

export const api = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
