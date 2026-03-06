import axios from "axios";
import { toast } from "sonner";

// Create the axios instance
const axiosClient = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token
axiosClient.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem("token");

    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Determine the error message
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred.";

    // Trigger global error toast
    toast.error(message);

    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login if token is invalid/expired
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");

      // We check if window is defined to avoid errors in non-browser environments
      if (typeof window !== "undefined" && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
