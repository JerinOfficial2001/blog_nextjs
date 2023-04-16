import React, { useState } from 'react'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import  TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import  Button  from "@mui/material/Button";
import supabaseURLKEY from '@/supabaseURLKEY';
import { useUser } from '@supabase/auth-helpers-react';
import { useSelector } from 'react-redux';


function Comments() {
  
    const blog =useSelector(state=>state.counter.blog);
    const {id} =blog
    const blog_id =id
  
    const [commentValidator, setcommentValidator] = useState(false)

    const [validator, setvalidator] = useState(false)
  const [commentData, setcommentData] = useState({
    comment:'',
    email:'',
    name:''
  })
const {comment,name,email}=commentData
const handleSubmit =async()=>{
    
    if(comment !=='' && name !=="" && email !==""){
       const {error}= await supabaseURLKEY
        .from('comments')
        .insert({blog_id,email,comment,name})
        if(error){
          console.log(error);
          setcommentValidator(true)
            
        }else{
          // setuserComments(data)
            setcommentValidator(false)

            setcommentData({  
              comment:'',
              email:'',
              name:'',
           
        } )}

        
      

    }else{
        setvalidator(true)
       
    }
}


  return (
    <Box 
        sx={{
          display:'flex',
         alignItems:'center',
          justifyContent:'center',
          flexDirection:'column',
        gap:2,
        width:'90%',
        backgroundColor:'lavender',
        borderRadius:10,
       marginBottom:2
          }}>
            <FormControl 
            sx={{
                width:'100%',
                display:'flex',
             alignItems:'center',
            justifyContent:'center',
            marginTop:2
            }}>
            <TextField size='small' value={comment} onChange={(e)=>{setcommentData({...commentData,comment:e.target.value})}} label='comment' variant="outlined" sx={{width:'90%'}}/>
            
            </FormControl>

            <FormControl  sx={{
                width:'100%',
                display:'flex',
             alignItems:'center',
            justifyContent:'center',
        flexDirection:'row',
        gap:2.5
            }}>
            <TextField size='small' value={name} onChange={(e)=>{setcommentData({...commentData,name:e.target.value})}} type="text" label='Name' variant="outlined" sx={{width:'44%',marginBottom:2}}/>
            <TextField size='small' value={email} onChange={(e)=>{setcommentData({...commentData,email:e.target.value})}} type="email" label='Email' variant="outlined" sx={{width:'44%',marginBottom:2}}/>
            </FormControl>
       {validator && <Typography color="red"> All fields are mandatory*</Typography>}
       {commentValidator &&<Typography color='red'>Sorry,your comment not added!</Typography>}
            <Button sx={{
               borderColor: "black",
               "&:hover": { color: "black", backgroundColor: "lavender" },
              marginBottom:2
            }} 
            variant='outlined'
            onClick={()=>{handleSubmit()}} 
            size="small">
              Post Comment
              </Button>
             
      </Box>
  )
}

export default Comments;