import axios from "axios";
import { API_URL } from "../constants/api";

const userService = {
  // Fetch user profile
  getMe: async (token) => {
    return axios.get(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  // Update user profile
  getUsers: async (token) => {
    return axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  // Delete user profile
  deleteUser: async (userId, token) => {
    return axios.delete(`${API_URL}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default userService;
