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
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "@/slices/actions/blogAction";

function Homepage({ session }) {
  const [isLoading, setisLoading] = useState(false);
  const [switchBtn, setswitchBtn] = useState(false);
  const dispatch = useDispatch();
  const share = (blog) => {
    navigator.share(blog);
  };
  //get blogdatas
  const blog = useSelector((state) => state.blogReducer.allBlogs);
  const [blogDatas, setBlogDatas] = useState(blog);
  const getBlogDatas = async () => {
    setisLoading(true);
    // const { data, error } = await supabaseURLKEY.from("blogdatas").select();
    // if (data) {
    //   setBlogDatas(data);
    // } else {
    //   console.log(error);
    // }
    const result = await dispatch(getAllBlogs());
    setBlogDatas(result?.payload?.data);
    console.log(result);
    setisLoading(false);
  };
  useEffect(() => {
    getBlogDatas();
  }, [blog?.length]);

  //delete blog

  const deleteBlogDatas = (id) => {
    setBlogDatas((prev) => {
      return prev.filter((blog) => blog.id !== id);
    });
  };

  //profile
  const [openProfile, setopenProfile] = React.useState(false);
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  // const [username, setUsername] = useState(null);
  // const [dob, setDob] = useState(null);
  // const [avatar_url, setAvatarUrl] = useState(null);
  const [adminDatas, setadminDatas] = useState({
    username: null,
    dob: null,
    avatar_url: null,
  });

  // const {username,dob,avatar_url, blog_title,
  //   blog_description,
  //   blog_author,
  //   blog_category,
  //   blog_content}=adminDatas

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, dob, avatar_url`)
        .eq("id", user.id)
        .single();
      console.log(getProfile);
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setadminDatas(data);
        // setUsername(data.username);
        // setDob(data.dob);
        // setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, dob, avatar_url }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        username,
        dob,
        avatar_url,
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

  return (
    <>
      {isLoading && <Loader open={isLoading} />}
      <Layout
        setopenProfile={setopenProfile}
        adminDatas={adminDatas}
        supabase={supabase}
        switchBtn={switchBtn}
        setswitchBtn={setswitchBtn}
        session={session}
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
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            padding: 2,
            flexWrap: "wrap",
          }}
          flex={4}
        >
          {blogDatas.length > 0 ? (
            blogDatas.map((blogData) => {
              return (
                <>
                  <BlogCard
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
