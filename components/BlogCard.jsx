import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import supabaseURLKEY from "@/supabaseURLKEY";
import CardLayout from "@/Layouts/CardLayout";



function BlogCard({adminDatas, blogData, deleteBlogDatas }) {
  const {username}=adminDatas
  
  const {
    blog_title,
    blog_description,
   
    blog_category,
    blog_content,
    id,
  } = blogData;


  const [expanded, setExpanded] = React.useState(false);
  const [openDialogBox, setopenDialogBox] = useState(false);

  //deleteblog
  const deleteHandler = async (id) => {
    const { error } = await supabaseURLKEY
      .from("blogdatas")
      .delete()
      .eq("id",id);
    if (error) {
      console.log(error);
    }else{
      setopenDialogBox(false)
    }
    deleteBlogDatas(id);
  };


  
  return (
   
    <CardLayout setopenDialogBox={setopenDialogBox} openDialogBox={openDialogBox} deleteCard={deleteHandler} deleteCardID={id} setExpanded={setExpanded} expanded={expanded} expandcontent={blog_content} >
          <Typography variant="h5" component="div">
            {blog_title || ''}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {username || ""}
          </Typography>
          <Typography variant="body2">{blog_category || ''}</Typography>
          <Typography variant="body2">{blog_description || ''}</Typography>
     </CardLayout>
   
  );
}

export default BlogCard;
