import axios from "axios";
import { getLocalStorage } from "./localStorage";

const BASE_URL = import.meta.env?.VITE_API_BASE_URL;

let unauthorizedHandler = null;

export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = typeof handler === "function" ? handler : null;
}

export function createClient(config = {}) {
  return axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    ...config,
  });
}

export const publicClient = createClient();

export const authClient = createClient({ baseURL: BASE_URL });

authClient.interceptors.request.use(
  (config) => {
    const token = getLocalStorage("access_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 && unauthorizedHandler) {
      try {
        unauthorizedHandler(error);
      } catch {
        // no-op
      }
    }
    return Promise.reject(error);
  },
);
