import Stack from "@mui/material/Stack";
import Image from "next/image";
import React from "react";
import Gif from "../assets/empty.gif";

function NoItems() {
  return (
    <Stack
      height="460px"
      width="20px"
      alignItems="center"
      justifyContent="center"
    >
      <Image style={{height:'150px',width:'150px'}} src={Gif} alt='no items'/>
    </Stack>
  );
}

export default NoItems;
