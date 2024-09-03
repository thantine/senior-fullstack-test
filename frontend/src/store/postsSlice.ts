import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchPosts,
  createNewPost,
  postFacebook,
  countMetrics,
} from "../api/postsService";

export interface Post {
  id: string;
  content: string;
  fbPostId?: string;
  like?: number;
  share?: number;
}

interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  postToFacebookError: string | null;
  jobStarted: boolean;
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
  postToFacebookError: null,
  jobStarted: false,
};

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const posts = await fetchPosts();
  return posts;
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost: { content: string }) => {
    return await createNewPost(newPost);
  }
);

export const postToFacebook = createAsyncThunk(
  "posts/postToFacebook",
  async (id: string) => {
    return await postFacebook(id);
  }
);

export const countFacebookMetrics = createAsyncThunk(
  "posts/countMetrics",
  async () => {
    return await countMetrics();
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to create post";
      })
      .addCase(postToFacebook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postToFacebook.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("action", action);
        state.posts = state.posts.map((post) =>
          post.id === action.payload.id
            ? { ...action.payload, content: post.content }
            : post
        );
      })
      .addCase(postToFacebook.rejected, (state, action) => {
        state.status = "failed";
        state.postToFacebookError =
          action.error.message || "Failed to post to facebook";
      })
      .addCase(countFacebookMetrics.fulfilled, (state) => {
        state.jobStarted = true;
      })
      .addCase(countFacebookMetrics.rejected, (state) => {
        state.jobStarted = false;
      });
  },
});

export default postsSlice.reducer;
