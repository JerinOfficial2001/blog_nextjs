import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";



function UserCardLayout({children,navigator}) {



return (
   
    <Card
      sx={{
        width: { ex: 900, lg: 900, md: 700, sm: 500, xs: 300 },
        "&:hover": { boxShadow: "0px 1px 5px 0px black", elevation: 20 },
        boxShadow: "0px 1px 5px 0px grey",
        elevation: 20,
        borderRadius: 4,
        marginBottom:1
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Stack>
         {children}
        </Stack>
      </CardContent>

      <Box
        sx={{
          
          width:'98%'
        }}
      >
      
        <Button sx={{float: "right",}} onClick={()=>{navigator()}} size="small">
          Learn More
        </Button>
      </Box>
      
      
    </Card>
  
  );
}

export default UserCardLayout;
