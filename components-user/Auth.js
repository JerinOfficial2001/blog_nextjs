import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import supabaseURLKEY from "@/supabaseURLKEY";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Auth() {
  const [validator, setvalidator] = useState(false);
  const [swiftPage, setswiftPage] = useState(false);
  const [sucessmsg, setsucessmsg] = useState(false);
  const [alert, setalert] = useState(false);
  const [inputData, setinputData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { name, email, password } = inputData;
  //login
  const loginHandler = async () => {
    if (email !== "" && password !== "") {
      setvalidator(false);
      setalert(false);
      const { error } = await supabaseURLKEY.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.log("LOGIN", error);
        setalert(true);
      }
     
    } else {
      setvalidator(true);
      setalert(false);
    }
    setinputData({
      email: "",
      password: "",
    });
  };
  //signup
  const signupHandler = async () => {
    if (name !=="" && email !== "" && password !== "") {
      setvalidator(false);
      setalert(false);
      setsucessmsg(false);

      const { error } = await supabaseURLKEY.auth.signUp({
        email: email,
        password: password,
        options: {
          data: { first_name: name },
        },
      });
      if (error) {
        console.log("SIGNUP", error);
        setalert(true);
      } else {
        setsucessmsg(true);
      }
      setinputData({
        email: "",
        password: "",
        name:''
      });
    } else {
      setvalidator(true);
      setalert(false);
      setsucessmsg(false);
    }
  };
  return (
    <>
      {!swiftPage ? (
        <Stack
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
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => {
                setinputData({ ...inputData, email: e.target.value });
              }}
            />

            <TextField
              size="small"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => {
                setinputData({ ...inputData, password: e.target.value });
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
              loginHandler();
            }}
          >
            Login
          </Button>
          <Stack direction="row" alignItems="center" gap="5px">
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
          )}
        </Stack>
      ) : (
        <Stack
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
              value={name}
              onChange={(e) => {
                setinputData({ ...inputData, name: e.target.value });
              }}
            />
            <TextField
              size="small"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => {
                setinputData({ ...inputData, email: e.target.value });
              }}
            />
            <TextField
              size="small"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => {
                setinputData({ ...inputData, password: e.target.value });
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
              signupHandler();
            }}
          >
            Sign Up
          </Button>
          <Stack direction="row" alignItems="center" gap="5px">
            <Typography color="black">{"Already have an account?"}</Typography>
            <Link
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setswiftPage(false);
                setvalidator(false);
                setalert(false);
                setsucessmsg(false);
              }}
            >
              log in
            </Link>
          </Stack>
          {validator && (
            <Typography color="red">All fields are mandatory*</Typography>
          )}
          {alert && (
            <Typography color="red">Give valid email & password!</Typography>
          )}
          {sucessmsg && (
            <Typography color="green">link sent to your gmail</Typography>
          )}
        </Stack>
      )}
    </>
  );
}
