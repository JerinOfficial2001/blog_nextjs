import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog:{},
  profile:{},
  comment:{},
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {

    getBlog:(state,{payload})=>{
     
      state.blog=payload
    },
  getusername:(state,{payload})=>{
    state.profile=payload
    
  },
  getusercomment:(state,{payload})=>{
    state.comment=payload

  }
  }
});

// Action creators are generated for each case reducer function
export const { getBlog ,getusername,getusercomment} = counterSlice.actions;

export default counterSlice.reducer;
