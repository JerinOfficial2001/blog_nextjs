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

function Homepage({ session }) {
  const [isLoading, setisLoading] = useState(false);
  const [switchBtn, setswitchBtn] = useState(false);

  //get blogdatas
  const [blogDatas, setBlogDatas] = useState([]);

  const getBlogDatas = async () => {
    setisLoading(true);
    const { data, error } = await supabaseURLKEY.from("blogdatas").select();
    if (data) {
      setBlogDatas(data);
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
      <Layout setswitchBtn={setswitchBtn} session={session}>
        <Stack
          direction="row"
          width="100%"
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
          }}
        >
          {switchBtn && (
            <Box
              sx={{
                width: { ex: 300, lg: 300, md: 300, sm: 200, xs: 200 },
              }}
            >
              <List getBlogData={getBlogDatas} />
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "10px 0px 0px",
              gap: 5,
            }}
            flex={4}
          >
            <Box width="100%"></Box>
            {blogDatas.length > 0 ? (
              blogDatas.map((blogData) => {
                return (
                  <>
                    <BlogCard
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
        </Stack>
      </Layout>
    </>
  );
}

export default Homepage;
