import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog:{},
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    getBlog:(state,{payload})=>{
      state.blog=payload
    }}
});

// Action creators are generated for each case reducer function
export const { getBlog } = counterSlice.actions;

export default counterSlice.reducer;
