import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" }
});

// Interceptor untuk Log dan Autentikasi
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  console.log(`[Request] ${config.method.toUpperCase()} to ${config.url}`);
  return config;
});

export default api;
