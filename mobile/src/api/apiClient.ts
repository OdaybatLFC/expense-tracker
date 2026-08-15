import axios from "axios";

import { clearAccessToken, getAccessToken } from "../auth/tokenStorage";

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();

    if (!token) {
      return config;
    }

    config.headers = config.headers ?? {};

    const headers = config.headers as any;

    if (typeof headers.set === "function") {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await clearAccessToken();
    }

    return Promise.reject(error);
  },
);
