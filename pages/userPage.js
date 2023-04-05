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
import UserCardLayout from "@/components-user/UserCardLayout";
import  Modal  from "@mui/material/Modal";
import  IconButton  from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import  TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import  Button  from "@mui/material/Button";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ReactTimeAgo from "react-time-ago";

TimeAgo.addDefaultLocale(en)


function UserPage() {
    const [isLoading, setisLoading] = useState(false);
  //get blogdatas
  const [blogDatas, setBlogDatas] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [validator, setvalidator] = useState(false)
  const [commentData, setcommentData] = useState({
    comment:'',
    email:'',
    name:''
  })
const {comment,name,email}=commentData

const handleSubmit =()=>{
    if(comment !=='' && name !=="" && email !==""){
        setcommentData({})
    }else{
        setvalidator(true)
    }
}

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

  return (
    <>
    {isLoading && <Loader/>}
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
    }}
    flex={4}
  >
    <Box width="100%"></Box>
    {blogDatas.length > 0 ? (
      blogDatas.map((blogData) => {
        const {
            blog_title,
            blog_description,
            blog_author,
            blog_category,
            blog_content,
            id,
            created_at
          } = blogData;
        return (
          <>
            <UserCardLayout
              
              setExpanded={setExpanded} 
             > <Typography color='grey' fontSize='small'>
              <ReactTimeAgo date={created_at}/>
              </Typography>
                    <Typography variant="h5" component="div">
            {blog_title || ''}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {blog_author}
          </Typography>
          <Typography variant="body2">{blog_category || ''}</Typography>
          <Typography variant="body2">{blog_description || ''}</Typography>
             </UserCardLayout>
             <Modal open={expanded} sx={{display: "flex",

      justifyContent: "center",}}>
            <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: 3,
      backgroundColor:'white',
      width:'90%',
      borderRadius:20,
      border:'4px solid red',
      alignItems:'center',
      overflow:'scroll',
      overflowX:'hidden',
   
    }}>
       <Box width='100%' sx={{float:'right'}}>
        <IconButton onClick={()=>{setExpanded(false)}} sx={{float:'right',margin:'20px 30px 0px 0px',position:'absolute',right:60}} >
            <CloseRoundedIcon color="black"/>
        </IconButton>
       </Box>
      
       <Typography color="black" fontWeight='bold' variant="h4" component="div">
            {blog_title || ''}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Author:{blog_author}
          </Typography>
          <Typography color="text.secondary" variant="body2">{blog_category || ''}</Typography>
          <Typography color="text.secondary" variant="body2">{blog_description || ''}</Typography>
<div style={{color:'black'}} dangerouslySetInnerHTML={{__html : blog_content}} ></div>
 
<Box 
        sx={{
          display:'flex',
         alignItems:'center',
          justifyContent:'center',
          flexDirection:'column',
        gap:3,
        width:'100%'
          }}>
            <FormControl 
            sx={{
                width:'100%',
                display:'flex',
             alignItems:'center',
            justifyContent:'center'
            }}>
            <TextField value={comment} onChange={(e)=>{setcommentData({...commentData,comment:e.target.value})}} label='comment' variant="outlined" sx={{width:'90%'}}/>
            
            </FormControl>

            <FormControl  sx={{
                width:'100%',
                display:'flex',
             alignItems:'center',
            justifyContent:'center',
        flexDirection:'row',
        gap:2.5
            }}>
            <TextField value={name} onChange={(e)=>{setcommentData({...commentData,name:e.target.value})}} type="text" label='Name' variant="outlined" sx={{width:'44%',marginBottom:2}}/>
            <TextField value={email} onChange={(e)=>{setcommentData({...commentData,email:e.target.value})}} type="email" label='Email' variant="outlined" sx={{width:'44%',marginBottom:2}}/>
            </FormControl>
       {validator && <Typography color="red"> All fields are mandatory</Typography>}
            <Button onClick={()=>{handleSubmit()}} size="small">Post Comment</Button>
      </Box>
 </Box>

             </Modal>
            
          </>
        );
      })
    ) : (
      <NoItems />
    )}
  </Box>
  </>
  )
}

export default UserPage;