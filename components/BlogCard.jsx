import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import supabaseURLKEY from "@/supabaseURLKEY";
import CardLayout from "@/Layouts/CardLayout";


function BlogCard({ blogData,share, deleteBlogDatas }) {
  
  const {
    blog_title,
    blog_description,
    blog_author,
    blog_category,
    blog_content,
    id,
  } = blogData;


  const [expanded, setExpanded] = React.useState(false);


  //deleteblog
  const deleteHandler = async (id) => {
    const { error } = await supabaseURLKEY
      .from("blogdatas")
      .delete()
      .eq("id", id);
    if (error) {
      console.log(error);
    }
    deleteBlogDatas(id);
  };


  
  return (
   
    <CardLayout deleteCard={deleteHandler} deleteCardID={id} setExpanded={setExpanded} expanded={expanded} expandcontent={blog_content} >
          <Typography variant="h5" component="div">
            {blog_title || ''}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {blog_author}
          </Typography>
          <Typography variant="body2">{blog_category || ''}</Typography>
          <Typography variant="body2">{blog_description || ''}</Typography>
     </CardLayout>
   
  );
}

export default BlogCard;
