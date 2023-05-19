import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {WhatsappShareButton} from "react-share"
import  IconButton  from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";


function UserCardLayout({children,navigator}) {
const pageurl =window.location.href
const [openBlogMenu, setopenBlogMenu] = useState(false);


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
        <Stack>
          <IconButton
            onClick={() => {
              setopenBlogMenu((p) => !p);
            }}
          >
            <MoreVertIcon/>
          </IconButton>
          {openBlogMenu && (
            <div
              onMouseLeave={() => {
                setopenBlogMenu(false);
              }}
              style={{
                backgroundColor: "lavender",

                position: "absolute",
                borderRadius: "15px",
                boxShadow: "0px 1px 2px 0 black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                zIndex:999
              }}
            >
              <IconButton onClick={()=>{navigate()}}>
                <EditIcon sx={{ fontSize: "medium" }} />
              </IconButton>
              <IconButton
                onClick={() => {
                  setopenDialogBox(true);
                }}
              >
                <DeleteIcon sx={{ fontSize: "medium" }} />
              </IconButton>
              <IconButton  >
                <WhatsappShareButton url={pageurl} >
                <ShareIcon sx={{ fontSize: "medium" }} />
                </WhatsappShareButton>
              </IconButton>
              <IconButton
                onClick={() => {
                  setopenBlogMenu(false);
                }}
              >
                <CloseIcon sx={{ fontSize: "medium" }} />
              </IconButton>
            </div>
          )}
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
