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
