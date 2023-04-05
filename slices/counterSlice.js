import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog:{},
  username:""
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {

    getBlog:(state,{payload})=>{
      console.log(payload);
      state.blog=payload
    },
  getusername:(state,{payload})=>{
    state.username=payload
  }
  }
});

// Action creators are generated for each case reducer function
export const { getBlog ,getusername} = counterSlice.actions;

export default counterSlice.reducer;
