const { default: supabaseURLKEY } = require("@/supabaseURLKEY");
const { createAsyncThunk } = require("@reduxjs/toolkit/dist");

export const getAllBlogs = createAsyncThunk(
  `getAllBlogs`,
  async (rejectWithValue) => {
    try {
      const response = await supabaseURLKEY.from("blogdatas").select();
      console.log("RESPONSE", response);
      if (response.status === 201 || response.status === 200) {
        return response;
      } else {
        console.log(response.error);
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// const getBlogDatas = async () => {
//   setisLoading(true);
//   const { data, error } = await supabaseURLKEY.from("blogdatas").select();
//   if (data) {
//     setBlogDatas(data);
//   } else {
//     console.log(error);
//   }
//   setisLoading(false);
// };
