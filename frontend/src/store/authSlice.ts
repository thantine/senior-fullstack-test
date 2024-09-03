import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, signup } from "../api/authService";

interface AuthState {
  isLoggedIn: boolean;
  user: { email: string } | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  loginError: string | null;
  signupError: string | null;
}

const token = localStorage.getItem("token");
const email = localStorage.getItem("userEmail");

const isLoggedIn = !!token && !!email;

const initialState: AuthState = {
  isLoggedIn,
  user: email ? { email } : null,
  token: token || null,
  status: isLoggedIn ? "succeeded" : "idle",
  loginError: null,
  signupError: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }) => {
    return await login(credentials);
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData: { name: string; email: string; password: string }) => {
    return await signup(userData);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.loginError = null;
      state.signupError = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, accessToken } = action.payload;

        state.isLoggedIn = true;
        state.status = "succeeded";
        state.loginError = null;
        state.user = user;
        state.token = accessToken;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("userEmail", user.email);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.loginError = action.error.message || "Failed to login";
      })
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        const { user, accessToken } = action.payload;

        state.isLoggedIn = true;
        state.status = "succeeded";
        state.signupError = null;
        state.user = user;
        state.token = accessToken;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("userEmail", user.email);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.signupError = action.error.message || "Failed to sign up";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
