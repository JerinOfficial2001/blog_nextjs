import Container from "@mui/material/Container";
import React, { useState } from "react";
import NavBar from "../components/NavBar";

function Layout({ setswitchBtn, children, session }) {
  return (
    <>
      <NavBar setswitchBtn={setswitchBtn} session={session} />
      <Container
        maxWidth="el"
        sx={{
          backgroundColor: "lavender",
        }}
      >
        {children}
      </Container>
    </>
  );
}

export default Layout;
