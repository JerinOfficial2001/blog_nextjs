import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function ModalLayout({ children, open, close }) {
  return (
    <Modal
      open={open}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 450,
          gap: "10px",
          flexDirection: "column",
          border: "2px solid red",
          height: 500,
          borderRadius: "40px",
          boxShadow: "1px 0px 10px black",
        }}
      >
        <Box sx={{ width: "100%"}}>
          <IconButton
            sx={{ float: "right" ,margin:"1% 2% 0px 0px"}}
            onClick={() => {
              close(false);
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Box sx={{ height: "99%",width:'90%'}}>{children}</Box>
      </Box>
    </Modal>
  );
}

export default ModalLayout;
