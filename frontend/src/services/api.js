import axios from "axios";

// Define the base URL for the API
const API_URL = "http://localhost:8080/api"; 

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