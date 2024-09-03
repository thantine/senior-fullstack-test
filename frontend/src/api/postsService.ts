import axiosInstance from "./axiosInstance"; // Adjust path if needed

export const fetchPosts = async () => {
  try {
    const response = await axiosInstance.get("/posts");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch posts");
  }
};

export const createNewPost = async (postData: { content: string }) => {
  try {
    const response = await axiosInstance.post("/posts", postData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create post");
  }
};

export const postFacebook = async (id: string) => {
  try {
    const response = await axiosInstance.put("/posts/facebook", { id });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to post to facebook"
    );
  }
};

export const countMetrics = async () => {
  try {
    const response = await axiosInstance.post("/posts/count-metrics");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to start job");
  }
};
