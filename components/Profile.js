import { useState, useEffect } from "react";
import {  useSession } from "@supabase/auth-helpers-react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Homepage from "@/pages/homepage";
import FormControl from "@mui/material/FormControl";
import ModalLayout from "@/Layouts/ModalLayout";

export default function Profile({ open, close, updateProfile,loading,adminDatas,setadminDatas}) {
  const {username,dob,avatar_url}=adminDatas
const session=useSession()
  return (
    <ModalLayout open={open} close={close}>
      <Stack
        sx={{ width: "100%", height: "100%" }}
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Typography color="black" variant="h4" fontWeight="bold">
          PROFILE
        </Typography>
        <FormControl
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "80%",
            height: "50%",
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            id="email"
            type="text"
            value={session?.user?.email}
          />

          <TextField
            label="Username"
            id="username"
            type="text"
            value={username || ""}
            onChange={(e) => setadminDatas({...adminDatas,username:e.target.value})}
          />

          <TextField
            label="Dob"
            id="website"
            type="date"
            value={dob || ""}
            onChange={(e) => setadminDatas({...adminDatas,dob:e.target.value})}
          />
        </FormControl>
        <div>
          <Button
            variant="outlined"
            sx={{
              borderColor: "green",
              "&:hover": { color: "white", backgroundColor: "green" },
              width: 200,
            }}
            onClick={() => updateProfile({ username,dob, avatar_url })}
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </Button>
        </div>
      </Stack>
    </ModalLayout>
  );
}
