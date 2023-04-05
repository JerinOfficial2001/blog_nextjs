import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import MenuLayout from "@/Layouts/MenuLayout";
import SettingsIcon from "@mui/icons-material/Settings";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import PersonIcon from "@mui/icons-material/Person";
import LoginRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useRouter } from "next/router";

function NavBarUser() {
  const router =useRouter()
  const [switchMenuBtn, setswitchMenuBtn] = useState(false)
  
const navigator =()=>{
  router.push('/admin')
}
 



  return (
    <AppBar sx={{ position: "fixed" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BLOG
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            
              <IconButton onMouseEnter={()=>{setswitchMenuBtn(true)} } onClick={()=>{setswitchMenuBtn((p)=>!p)}} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
           
              {switchMenuBtn && (
              <MenuLayout close={setswitchMenuBtn}>
                <ListItem disablePadding>
                  <ListItemButton >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" sx={{ color: "black" }} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Setting" sx={{ color: "black" }} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => {
                      navigator()
                    }}>
                    <ListItemIcon>
                      <LoginRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" sx={{ color: "black" }} />
                  </ListItemButton>
                </ListItem>
              </MenuLayout>
            )}
           
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBarUser;
