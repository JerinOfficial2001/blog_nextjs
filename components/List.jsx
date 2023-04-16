import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import Button from "@mui/material/Button";
import { useSession } from "@supabase/auth-helpers-react";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import CommentIcon from "@mui/icons-material/Comment";
import ModalLayout from "@/Layouts/ModalLayout";
import Edit from "@mui/icons-material/Edit";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar'



function List({updateProfile,setadminDatas, adminDatas, supabase, setopenProfile }) {
  const [hide, sethide] = useState(false);
  const session = useSession();
const comment =useSelector(state=>state.counter.comment);
  const { username, dob } = adminDatas;
  const router = useRouter();

  const navigateHandler = () => {
    router.push("/createblog");
  };
  const navigate = () => {
    router.push("/");
  };

  return (
    <Stack
      sx={{
        position: {
          el: "fixed",
          lg: "fixed",
          md: "fixed",
          sm: "fixed",
          xl: "none",
        },
        width: { ex: "20%", lg: "20%", md: "20%", sm: "30%", xs: "100%" },
        backgroundColor: "white",
      }}
      height="100%"
      alignItems="center"
    >
      <Box
        sx={{
          display: "flex",
          height: "100px",
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid rgba(128, 128, 128, 0.505)",
        }}
      >
        <Button
          onClick={() => {
            navigateHandler();
          }}
          variant="outlined"
          startIcon={<AddRoundedIcon />}
        >
          New Blog
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          height: "60px",
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="black" variant="h5" fontWeight="bold">
          Profile
        </Typography>
        <IconButton
          onClick={() => {
            setopenProfile((p) => !p);
          }}
        >
          <BorderColorRoundedIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          height: "50%",
          width: "90%",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography color="black">{username || ""}</Typography>

        <Typography color="black">{session?.user?.email}</Typography>

        <Typography color="black">{dob || ""}</Typography>
       
        <Button
          variant="outlined"
          sx={{
            borderColor: "black",
            "&:hover": { color: "black", backgroundColor: "lavender" },
            width: 200,
          }}
          startIcon={<CommentIcon />}
          endIcon={<Avatar sx={{color:'red',height:20,width:20,background:'white',boxShadow:"0px 0px 5px "}}>{comment.length}</Avatar>}
        >
          Comments
        </Button>
       
        <Button
          onClick={() => {
            sethide(true);
          }}
          variant="outlined"
          sx={{
            borderColor: "black",
            "&:hover": { color: "black", backgroundColor: "lavender" },
            width: 200,
          }}
          startIcon={<Edit />}
        >
          Edit
        </Button>
{/* edit */}
        {hide && <ModalLayout open={hide} close={sethide}> <Stack
          sx={{
            gap: 3,
            alignItems: "center",
            height: 350,
            justifyContent: "center",
          }}
        >
          <FormControl sx={{ display: "flex", gap: 1, width: "100%" }}>
            <TextField
              size="small"
              label="Name"
              variant="outlined"
              value={username}
              onChange={(e) => {
                setadminDatas({ ...adminDatas, username: e.target.value });
              }}
            />

            <TextField
            type="date"
              size="small"
              
              variant="outlined"
              value={dob}
              onChange={(e) => {
                setadminDatas({ ...adminDatas, dob: e.target.value });
              }}
            />
          </FormControl>
          <Button
            variant="contained"
            sx={{
              color: "white",
              "&:hover": { backgroundColor: "lightslategrey" },
            }}
            onClick={() => {
              updateProfile()
            }}
          >
            Update
          </Button>
          {/* <Stack direction="row" alignItems="center" gap="5px">
            <Typography color="black">{"Don't have an account?"}</Typography>
            <Link
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setswiftPage(true);
                setvalidator(false);
                setalert(false);
              }}
            >
              log in
            </Link>
          </Stack>
          {validator && (
            <Typography color="red">All fields are mandatory*</Typography>
          )}
          {alert && (
            <Typography color="red">email or password incorrect!</Typography>
          )}*/}
        </Stack> 
        </ModalLayout>}
       
        <Button
          variant="outlined"
          sx={{
            borderColor: "red",
            "&:hover": { color: "white", backgroundColor: "red" },
            width: 200,
          }}
          onClick={() => {
            navigate();
            supabase.auth.signOut();
            
          }}
          startIcon={<LogoutRounded />}
        >
          Sign Out
        </Button>
      </Box>
    </Stack>
  );
}

export default List;
