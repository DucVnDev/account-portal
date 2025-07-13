import axios from "axios";
import { API_URL } from "../constants/api";

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    // If token exists, set the Authorization header
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;