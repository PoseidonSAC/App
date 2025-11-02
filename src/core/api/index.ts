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
// if 401 response is received, redirect to login page
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login page
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
