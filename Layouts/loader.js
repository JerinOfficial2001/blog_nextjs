import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function Loader({ open }) {
  return (
    <Modal open={open}>
      <Box sx={{height:'100vh',width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <CircularProgress />
      </Box>
    </Modal>
  );
}

export default Loader;
