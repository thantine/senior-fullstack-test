import axiosInstance from "./axiosInstance";

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/users/login", credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to login");
  }
};

export const signup = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/users/signup", userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to signup");
  }
};
