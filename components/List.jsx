import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

function List( ) {
  const router = useRouter();
  const navigateHandler = () => {
    router.push("/createblog");
  };
  return (
    <Stack
      alignItems="center"
      height="100vh"
      position="fixed"
      borderRight="1px solid grey"
      width="20%"
    >
      <Box
        sx={{
          display: "flex",
          height: "40px",
          width: "100%",
          flexDirection: "row",
        }}
      ></Box>

      <Button
        onClick={() => {
          navigateHandler();
        }}
        variant="outlined"
        startIcon={<AddRoundedIcon />}
      >
        New Blog
      </Button>
    </Stack>
  );
}

export default List;
