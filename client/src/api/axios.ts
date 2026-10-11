import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = import.meta.env.VITE_API_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
