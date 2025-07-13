import axios from "axios";

// Define the base URL for the API
const API_URL = "http://localhost:8080/api"

const authService = {
  // Login function to authenticate user and return a token
  login: async (username, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { username, password });
      
      return res.data.token; // Assuming the response contains a token
    } catch (err) {
      return null;
    }
  },
  // Register function to create a new user
  register: async (username, password) => {
    try {
      await axios.post(`${API_URL}/auth/register`, { username, password });
      return true;
    } catch (err) {
      return false;
    }
  },
};

export default authService;