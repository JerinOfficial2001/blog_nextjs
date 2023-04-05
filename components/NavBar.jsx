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
  
  const [switchMenuBtn, setswitchMenuBtn] = useState(false);

  return (
    <AppBar  sx={{ position: "fixed" }}>
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
            href="/admin"
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
