import axios from "axios";
import { tokenStore } from "./tokenStore";

export interface RefreshAuthResponse {
  payload: {
    accessToken: string;
  };
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve(token!);
  });
  failedQueue = [];
};

// Attach access token
axiosInstance.interceptors.request.use((config) => {
  const token = tokenStore.getAccessToken();

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-refresh on 401
axiosInstance.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes("/v1/auth/refresh") ||
      originalRequest.url?.includes("/v1/auth/login")
    ) {
      return Promise.reject(error?.response?.data ?? error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = tokenStore.getRefreshToken();
      if (!refreshToken) throw new Error("No refresh token");

      const { payload } = await axios.post<RefreshAuthResponse>(
        `${API_URL}/v1/auth/refresh`,
        {
          refreshToken,
        },
      );

      tokenStore.setAccessToken(payload.accessToken);
      processQueue(null, payload.accessToken);

      originalRequest.headers.Authorization = `Bearer ${payload.accessToken}`;
      return axiosInstance(originalRequest);
    } catch (err) {
      processQueue(err, null);
      tokenStore.clear();
      window.location.href = "/login";
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);
