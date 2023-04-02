import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Profile from "./Profile";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuLayout from "@/Layouts/MenuLayout";
import SettingsIcon from "@mui/icons-material/Settings";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import PersonIcon from "@mui/icons-material/Person";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

function NavBar({ session, setswitchBtn }) {
  const [openProfile, setopenProfile] = React.useState(false);
  const [switchMenuBtn, setswitchMenuBtn] = useState(false);

  return (
    <AppBar position="static" sx={{ position: "sticky" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            onClick={() => {
              setswitchBtn((p) => !p);
            }}
          >
            <MenuRoundedIcon sx={{ color: "white" }} />
          </IconButton>
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
            <IconButton
              sx={{ p: 0 }}
              onMouseEnter={() => {
                setswitchMenuBtn(true);
              }}
              onClick={() => {
                setswitchMenuBtn((p) => !p);
              }}
            >
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>

            {switchMenuBtn && (
              <MenuLayout close={setswitchMenuBtn}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setopenProfile((p) => !p);
                    }}
                  >
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
                  <ListItemButton>
                    <ListItemIcon>
                      <LogoutRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" sx={{ color: "black" }} />
                  </ListItemButton>
                </ListItem>
              </MenuLayout>
            )}

            {openProfile && (
              <Profile
                open={openProfile}
                close={setopenProfile}
                session={session}
              />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
