import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000", // Default or environment URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config: any) => {
    // Get the token from the Redux store
    const token = localStorage.getItem("token");

    if (token) {
      // Attach the token to the headers if it exists
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
