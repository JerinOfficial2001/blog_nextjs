import React from 'react'
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import  IconButton  from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ReactTimeAgo from "react-time-ago";
import Comments from "@/components-user/comments";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';


function UserCardPage() {
  const router=useRouter()
    const blog =useSelector(state=>state.counter.blog);
    const {blog_title,
      blog_description,
      blog_category,
      blog_content,
      created_at,user_name}=blog;


      const navigator=()=>{
        router.push('/')
      }
  return (
    <Container  sx={{display: "flex",

      justifyContent: "center",}}>
            <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      backgroundColor:'white',
      width:'100%',
      
      
      alignItems:'center',
      overflow:'scroll',
      overflowX:'hidden',
   
    }}>
       <Box width='100%' sx={{float:'right'}}>
        <IconButton onClick={()=>{navigator()}} sx={{float:'right',margin:'20px 30px 0px 0px',position:'absolute',right:60}} >
            <CloseRoundedIcon color="black"/>
        </IconButton>
       </Box>
      <Box sx={{
      display: "flex",
      flexDirection: "column",
      width:'90%',
      gap:1.5
     }}>
      <Box sx={{
      width:'100%',
      borderBottom:'3px solid red',
      height:50
     }}>
        <Typography color="red" variant="h5" fontWeight='bold'>{blog_category || ''}</Typography>
        </Box>
       <Typography color="black" fontWeight='bold' variant="h4" component="div">
            {blog_title || ''}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            By {user_name}
          </Typography>
          
          <Typography color="text.secondary" variant="body2">{blog_description || ''}</Typography>
          
          <Typography color='grey' fontSize='small'>
              {/* <ReactTimeAgo date={created_at} locale="en"/> */}
              </Typography>
          </Box>
<div style={{color:'black',width:'90%'}} dangerouslySetInnerHTML={{__html : blog_content}} ></div>
 
<Box 
        sx={{
          display:'flex',
         alignItems:'center',
          justifyContent:'center',
          flexDirection:'column',
          gap:3,
          width:'100%',
         
         
          }}>
            <Comments/>
      </Box>
 </Box>

             </Container>
  )
}

export default UserCardPage;