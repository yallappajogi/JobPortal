import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Register a new user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error(
      "Registration Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data?.message || "Registration failed";
  }
};

// Login a user
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error(
      "Login Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data?.message || "Login failed";
  }
};
