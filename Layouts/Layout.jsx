import List from "@/components/List";
import Profile from "@/components/Profile";
import  Stack  from "@mui/material/Stack";
import  Box  from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import NavBar from "../components/NavBar";

function Layout({setopenProfile,supabase,adminDatas,switchBtn, setswitchBtn, children, session }) {

  return (
    <>
    <Stack direction='column'>
      <NavBar setswitchBtn={setswitchBtn} session={session} />
      <Box
        
        sx={{
          backgroundColor: "lavender",
          width:'100%',
          marginTop:8
        }}
      >
        <Stack
          direction="row"
         
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            
          }}
        >
         {switchBtn && (
            <Box
              sx={{
                position:{lg:'relative',md:'relative',sm:'relative', xs:'fixed'},
                width: { ex: "20%", lg: "20%", md: "20%", sm: "30%", xs: "100%" },
                borderRight:"1px solid rgba(128, 128, 128, 0.505)",
                backgroundColor:{lg:'none',xs:'white'},
                height:{xs:'100vh'},
                zIndex:{xs:999}
              }}
            >
               
              <List 
              setopenProfile={setopenProfile}
                session={session} 
                adminDatas={adminDatas} 
                supabase={supabase}
            />
            </Box>
          )}

        {children}
        </Stack>
      </Box>
      </Stack>
    </>
  );
}

export default Layout;
