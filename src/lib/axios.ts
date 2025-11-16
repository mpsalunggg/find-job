import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import type { ApiResponse, ApiError } from "@/types/response.type";

const axiosInstance = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    console.log(error);
    const normalizedError: ApiError = {
      message: error.response?.data?.message || "Terjadi kesalahan pada server",
      statusCode: error.response?.status,
      errors: error.response?.data?.errors || null,
    };
    return Promise.reject(normalizedError);
  }
);

export const api = {
  get: async <T = unknown>(url: string, config?: AxiosRequestConfig) => {
    return axiosInstance.get(url, config) as Promise<ApiResponse<T>>;
  },

  post: async <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance.post(url, data, config) as Promise<ApiResponse<T>>;
  },

  put: async <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance.put(url, data, config) as Promise<ApiResponse<T>>;
  },

  patch: async <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance.patch(url, data, config) as Promise<ApiResponse<T>>;
  },

  delete: async <T = unknown>(url: string, config?: AxiosRequestConfig) => {
    return axiosInstance.delete(url, config) as Promise<ApiResponse<T>>;
  },
};
