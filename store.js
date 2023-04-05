import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import blogReducer from "./slices/reducers/blog";

export const store = configureStore({
  reducer: {
    blogReducer: blogReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk),
});
