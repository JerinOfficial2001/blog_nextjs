import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";

function MenuLayout({ children, close }) {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        position: "absolute",
        "&:hover": { boxShadow: "0px 1px 5px 0px #6dcc93", elevation: 20 },
        right: 0,
        top: 70,
        width: 300,
        borderRadius: 4,
        boxShadow: "0px 1px 2px 0px black",
        elevation: 20,
        display: "flex",
        flexDirection: "column",
        zIndex:'100%'
      }}
    >
      <nav
        onMouseLeave={() => {
          close(false);
        }}
        aria-label="main mailbox folders"
      >
        <List>
          {children}
          {/* <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem> */}
        </List>
      </nav>
    </Box>
  );
}

export default MenuLayout;
