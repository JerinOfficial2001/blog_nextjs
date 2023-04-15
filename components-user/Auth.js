import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import  Button  from "@mui/material/Button";

export default function Auth() {
  const [inputData, setinputData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { name, email, password } = inputData;
  return (
    <>
      <Stack sx={{gap:3,alignItems:'center',height:350,justifyContent:"center"}}>
       <FormControl sx={{display:'flex',gap:1,width:'100%'}}>
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
          <Button variant="contained" sx={{color:'white',"&:hover":{backgroundColor:'lightslategrey'}}}>Login</Button>
       
      </Stack>
    </>
  );
}
