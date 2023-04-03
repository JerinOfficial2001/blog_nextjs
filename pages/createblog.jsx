import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { useState } from "react";
import supabaseURLKEY from "@/supabaseURLKEY";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import SendIcon from "@mui/icons-material/Send";
import Loader from "@/Layouts/loader";

export default function CreateBlog() {
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const [validator, setvalidator] = useState(false);
  const [inputData, setinputData] = useState({
    blog_title: "",
    blog_author: "",
    blog_category: "",
    blog_description: "",
    blog_content: "",
  });
  const {
    blog_title,
    blog_description,
    blog_author,
    blog_category,
    blog_content,
  } = inputData;

  //add blog

  const submitHandler = async () => {
    setisLoading(true);
    if (
      blog_title !== "" &&
      blog_author !== "" &&
      blog_category !== "" &&
      blog_description !== "" &&
      blog_content !== ""
    ) {
      const { data, error } = await supabaseURLKEY.from("blogdatas").insert({
        blog_title,
        blog_description,
        blog_author,
        blog_category,
        blog_content,
      });
      if (data) {
        setBlogDatas(data);
      } else {
        console.log(error);
      }
      setinputData({});
      router.push("/");
    } else {
      setvalidator(true);
    }
    console.log(inputData);
    setisLoading(false);
    
  };

  //Editor

  const editorRef = useRef(null);
  const log = () => {
    setisLoading(true);
    if (editorRef.current) {
      console.log("TEST", editorRef.current.getContent());
      setinputData({
        ...inputData,
        blog_content: editorRef.current.getContent(),
      });
    }
    setisLoading(false);
  };

  return (
    <>
      {isLoading && <Loader open={isLoading} />}
      <NavBar />

      <Container>
        <Stack
          sx={{ width: "100%", height: "100%" }}
          direction="column"
          justifyContent="space-around"
          alignItems="center"
          gap="10px"
        >
          <Typography color="black" variant="h4" fontWeight="bold">
            Create New Blog
          </Typography>
          <Stack width="100%" direction="row" spacing={2} alignItems="center">
            <FormControl
              sx={{
                width: "50%",
                display: "flex",
                gap: 2,
              }}
            >
              <TextField
                label={
                  <>
                    Title<span style={{ color: "red" }}>*</span>
                  </>
                }
                variant="outlined"
                type="text"
                value={blog_title}
                onChange={(e) => {
                  setinputData({ ...inputData, blog_title: e.target.value });
                }}
              />
              <TextField
                label={
                  <>
                    Author<span style={{ color: "red" }}>*</span>
                  </>
                }
                variant="outlined"
                type="blog_text"
                value={blog_author}
                onChange={(e) => {
                  setinputData({ ...inputData, blog_author: e.target.value });
                }}
              />
              <TextField
                label={
                  <>
                    Category<span style={{ color: "red" }}>*</span>
                  </>
                }
                variant="outlined"
                type="text"
                value={blog_category}
                onChange={(e) => {
                  setinputData({ ...inputData, blog_category: e.target.value });
                }}
              />
            </FormControl>
            <FormControl
              sx={{
                width: "50%",
                display: "flex",
                gap: 4.5,
              }}
            >
              <Box>
                <Button
                  startIcon={<SendIcon />}
                  variant="outlined"
                  sx={{
                    borderColor: "green",
                    "&:hover": { color: "white", backgroundColor: "green" },
                    width: 100,
                    float: "right",
                  }}
                  onClick={() => {
                    submitHandler();
                    //   log();
                  }}
                >
                  Publish
                </Button>
              </Box>
              <TextField
                label={
                  <>
                    Description<span style={{ color: "red" }}>*</span>
                  </>
                }
                rows={4}
                multiline
                type="text"
                value={blog_description}
                onChange={(e) => {
                  setinputData({
                    ...inputData,
                    blog_description: e.target.value,
                  });
                }}
              />
              {/* <Select></Select>
          <TextField rows={4} multiline type="text" /> */}
            </FormControl>
          </Stack>
          <Stack width="90%" direction="row" justifyContent="space-between">
            {/* <Button
            variant="outlined"
            sx={{
              borderColor: "green",
              "&:hover": { color: "white", backgroundColor: "green" },
              width: 100,
            }}
          >
            Cancel
          </Button> */}

            <Box width="100%">
              {validator && (
                <Typography variant="h8" color="red">
                  All Fields are mandatory*
                </Typography>
              )}
            </Box>
          </Stack>
        </Stack>
      </Container>
      <Container>
        <Editor
          initialValue="Type your text here."
          apiKey="7bbc8wgf339jea6gxr2m92nwmwlxe6tr1dki4s1d665e7wn6"
          onInit={(evt, editor) => (editorRef.current = editor)}
          onChange={log}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </Container>
    </>
  );
}
