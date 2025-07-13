import axios from "axios";

// Define the base URL for the API
const API_URL = "http://localhost:8080/api"

const authService = {
  // Login function to authenticate user and return a token
  login: async (username, password) => {
    console.log("[authService] Login request:", { username, password });
    try {
      const res = await axios.post(
        `${API_URL}/auth/login`,
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log("[authService] Login response:", res.data);
      return res.data.token; // Assuming the response contains a token
    } catch (err) {
      console.error("[authService] Login error:", err);
      return null;
    }
  },
  // Register function to create a new user
  register: async (username, email, password) => {
    console.log("[authService] Register request:", { username, email, password });
    try {
      const res = await axios.post(
        `${API_URL}/auth/register`,
        { username, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log("[authService] Register response:", res.data);
      return true;
    } catch (err) {
      console.error("[authService] Register error:", err);
      if (err.response && err.response.data && err.response.data.error) {
        return err.response.data.error;
      }
      return false;
    }
  },
};

export default authService;