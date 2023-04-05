import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
const { default: supabaseURLKEY } = require("@/supabaseURLKEY");
const { createAsyncThunk } = require("@reduxjs/toolkit/dist");

export const getUserDetails = createAsyncThunk(
  `getUserDetail`,
  async (rejectWithValue) => {
    const user = useUser();
    const supabase = useSupabaseClient();
    try {
      const response = await supabase
        ?.from("profiles")
        .select()
        .eq("id", user.id)
        .single();
      console.log("ADRESPONSE", response);
      if (response.status === 201 || response.status === 200) {
        console.log(response?.data?.id);
        localStorage.setItem("USERID", response.data?.id);
        return response.data;
      } else {
        console.log(response.error);
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
