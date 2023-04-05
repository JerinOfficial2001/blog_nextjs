import { createSlice } from "@reduxjs/toolkit";
import { getAllBlogs } from "../actions/blogAction";

const initialState = {
  allBlogs: [],
};

const Blog = createSlice({
  name: "blogReducer",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllBlogs.fulfilled]: (state, { payload }) => {
      console.log("PAYLoAD", payload?.data);
      state.allBlogs = payload?.data;
    },
  },
});

export const {} = Blog.actions;

export default Blog.reducer;
