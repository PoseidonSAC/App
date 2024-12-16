import axios from "axios";
import { ENV } from "../constant/env";

export const api = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
