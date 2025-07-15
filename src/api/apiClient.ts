import axios, { type AxiosRequestConfig } from "axios";
import { userMocks } from "./mocks/userMocks";
import { ServiceResponse } from "../types/ServiceResponse"

const USE_MOCK = false;

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.tuservicio.com",
  timeout: 30000,
});

instance.interceptors.response.use(
  (response) => {
    const apiResponse = response.data as ServiceResponse<any>;
    
    if (apiResponse.errors && apiResponse.errors.length > 0) {
      return Promise.reject(apiResponse.errors);
    }
    
    return apiResponse.data;
  },
  (error) => {
    console.error("HTTP Error:", error);

    return Promise.reject(["Ocurrió un error inesperado."]);
  }
);

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const apiClient = {
  async get<T>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    if (USE_MOCK) {
      return userMocks.get<T>(url, params);
    }

    return instance.get<ServiceResponse<T>>(url, { params, ...config }) as unknown as Promise<T>;
  },

  async post<T>(url: string, body?: any, config?: AxiosRequestConfig): Promise<T> {
    if (USE_MOCK) {
      return userMocks.post<T>(url, body);
    }

    return instance.post<ServiceResponse<T>>(url, body, config) as unknown as Promise<T>;
  },

  async put<T>(url: string, body?: any, config?: AxiosRequestConfig): Promise<T> {
    if (USE_MOCK) {
      return userMocks.put<T>(url, body);
    }

    return instance.put<ServiceResponse<T>>(url, body, config) as unknown as Promise<T>;
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    if (USE_MOCK) {
      return userMocks.delete<T>(url);
    }

    return instance.delete<ServiceResponse<T>>(url, config) as unknown as Promise<T>;
  }
};
