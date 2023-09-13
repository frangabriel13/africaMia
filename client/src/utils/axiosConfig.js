import axios from "axios";

const instance = axios.create({
  baseURL: "http://85.31.235.118:3001",
  headers: {
    "Content-Type": "multipart/form-data",
    "Content-Type": "application/json",
  },
});

export default instance;