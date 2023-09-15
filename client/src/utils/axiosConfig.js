import axios from "axios";

const instance = axios.create({
  baseURL: "https://africamia-jeans.online/api",
  headers: {
    "Content-Type": "multipart/form-data",
    "Content-Type": "application/json",
  },
});

export default instance;