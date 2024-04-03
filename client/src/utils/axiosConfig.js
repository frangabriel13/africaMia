import axios from "axios";

export const instance = axios.create({
  baseURL: "https://africamia-jeans.online/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const imageInstance = axios.create({
  baseURL: "https://africamia-jeans.online/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});