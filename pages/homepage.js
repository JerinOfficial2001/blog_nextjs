import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import NavBar from "@/components/NavBar";
import Layout from "@/Layouts/Layout";
import List from "@/components/List";
import BlogCard from "@/components/BlogCard";
import supabaseURLKEY from "@/supabaseURLKEY";
import NoItems from "@/components/NoItems";
import MenuLayout from "@/Layouts/MenuLayout";
import Loader from "@/Layouts/loader";
//profile
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Profile from "@/components/Profile";
import EditBlog from "./editBlog";
import { useDispatch } from "react-redux";
import { getprofile, getusername } from "@/slices/counterSlice";

function Homepage({ session }) {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [switchBtn, setswitchBtn] = useState(false);
  const share = (blog) => {
    navigator.share(blog);
  };

  //profile
  const [openProfile, setopenProfile] = React.useState(false);
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  // const [username, setUsername] = useState(null);
  // const [dob, setDob] = useState(null);
  // const [avatar_url, setAvatarUrl] = useState(null);
  const [adminDatas, setadminDatas] = useState({ username: null, dob: null });
const {username,dob}=adminDatas
  // const {username,dob,avatar_url, blog_title,
  //   blog_description,
  //   blog_author,
  //   blog_category,
  //   blog_content}=adminDatas

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, dob`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        dispatch(getusername(data));
        setadminDatas(data);
        // setUsername(data.username);
        // setDob(data.dob);
        // setAvatarUrl(data.avatar_url);
        console.log("DATA",data);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        username,
        dob,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  //get blogdatas
  const [blogDatas, setBlogDatas] = useState([]);
  const getBlogDatas = async () => {
    setisLoading(true);
    const { data, error } = await supabaseURLKEY
      .from("blogdatas")
      .select()
      .order("id", { ascending: false });
    if (data) {
      let blogs = data?.filter((i) => i.user_id === user?.id);
      setBlogDatas(blogs);
    } else {
      console.log(error);
    }
    setisLoading(false);
  };
  useEffect(() => {
    getBlogDatas();
  }, []);

  //delete blog

  const deleteBlogDatas = (id) => {
    setBlogDatas((prev) => {
      return prev.filter((blog) => blog.id !== id);
    });
  };

  return (
    <>
      {isLoading && <Loader open={isLoading} />}
      <Layout
        setadminDatas={setadminDatas}
        setopenProfile={setopenProfile}
        adminDatas={adminDatas}
        supabase={supabase}
        switchBtn={switchBtn}
        setswitchBtn={setswitchBtn}
        session={session}
        updateProfile={updateProfile}
      >
        {openProfile && (
          <Profile
            open={openProfile}
            close={setopenProfile}
            session={session}
            user={user}
            adminDatas={adminDatas}
            setadminDatas={setadminDatas}
            updateProfile={updateProfile}
            loading={loading}
            supabase={supabase}
            // avatar_url={avatar_url}
            // username={username}
            // setUsername={setUsername}
            // setDob={setDob}
            // dob={dob}
          />
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
          flex={4}
        >
          {blogDatas.length > 0 ? (
            blogDatas.map((blogData, index) => {
              return (
                <>
                  <BlogCard
                    key={index}
                    adminDatas={adminDatas}
                    session={session}
                    share={share}
                    blogData={blogData}
                    deleteBlogDatas={deleteBlogDatas}
                  />
                </>
              );
            })
          ) : (
            <NoItems />
          )}
        </Box>
      </Layout>
    </>
  );
}

export default Homepage;
