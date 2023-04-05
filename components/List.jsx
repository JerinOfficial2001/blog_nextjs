import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import  Button  from "@mui/material/Button";
import Home from "@/pages";


function List( {session,adminDatas,supabase,setopenProfile}) {
  const {username,dob,avatar_url}=adminDatas
  const router = useRouter();
  const navigateHandler = () => {

if(session){
    router.push("/createblog");
  }else{
    <Home/>
  }
  };


  

  return (
    <Stack

      sx={{position:{ el:"fixed",lg:"fixed",md:"fixed",sm:"fixed",xl:'none'},width:{ex:"20%",lg:'20%',md:'20%',sm:'30%',xs:'100%'}}}
      height="100%"
      alignItems='center'

    >
      <Box
        sx={{
          display: "flex",
          height: "100px",
          width: "90%",        
          justifyContent:'center',
          alignItems:'center',
          borderBottom:'1px solid rgba(128, 128, 128, 0.505)'
        }}
      >
        <Button
        onClick={() => {
          navigateHandler();
        }}
        variant="outlined"
        startIcon={<AddRoundedIcon />}
      >
        New Blog
      </Button>
      </Box>

      <Box sx={{
         display: "flex",
          height: "60px",
          width: "90%",
          justifyContent:'center',
          alignItems:'center',}}>
        <Typography color="black" variant="h5" fontWeight='bold'>Profile</Typography>
        <IconButton 
           onClick={() => { setopenProfile((p) => !p)}}>
          <BorderColorRoundedIcon/>
        </IconButton>
        
      </Box>
      
      <Box sx={{
         display: "flex",
          height: "50%",
          width: "90%",
          justifyContent:'space-between',
          alignItems:'center',
          flexDirection:'column'
          }}>
      
      <Typography color="black" >
        {username || ""}
        </Typography>
        
        <Typography color="black" >
        {session?.user?.email}
        </Typography>
       
        <Typography color="black" >
        {dob || ""}
        </Typography>
          <Button
            variant="outlined"
            sx={{
              borderColor: "red",
              "&:hover": { color: "white", backgroundColor: "red" },
              width: 200,
            }}
            onClick={() => supabase.auth.signOut()}
          >
            Sign Out
          </Button>
      
      </Box>
    </Stack>
  );
}

export default List;
