import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import postsSlice from "./postsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsSlice,
  // Add other reducers here
});

export default rootReducer;
