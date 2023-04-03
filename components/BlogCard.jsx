import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import supabaseURLKEY from "@/supabaseURLKEY";
import Stack from "@mui/material/Stack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import DialogLayout from "@/Layouts/DialogLayout";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import deleteimg from "../assets/deletemark.jpg";
import Image from "next/image";
import { documentToReactComponents} from '@contentful/rich-text-react-renderer'

function BlogCard({ blogData,share, deleteBlogDatas }) {
  const [openBlogMenu, setopenBlogMenu] = useState(false);
  const [openDialogBox, setopenDialogBox] = useState(false);
  const {
    blog_title,
    blog_description,
    blog_author,
    blog_category,
    blog_content,
    id,
  } = blogData;

  const textEditorContent = (new JSDOM('')).window;
  const DOMPurify = createDOMPurify(textEditorContent)

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //deleteblog
  const deleteHandler = async (id) => {
    const { error } = await supabaseURLKEY
      .from("blogdatas")
      .delete()
      .eq("id", id);
    if (error) {
      console.log(error);
    }
    deleteBlogDatas(id);
  };

  return (
    <Card
      sx={{
        width: { ex: 900, lg: 900, md: 700, sm: 500, xs: 300 },
        "&:hover": { boxShadow: "0px 1px 5px 0px black", elevation: 20 },
        boxShadow: "0px 1px 5px 0px grey",
        elevation: 20,
        borderRadius: 4,
        marginBottom: 2,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Stack>
          <Typography variant="h5" component="div">
            {blog_title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {blog_author}
          </Typography>
          <Typography variant="body2">{blog_category}</Typography>
          <Typography variant="body2">{blog_description}</Typography>
        </Stack>
        <Stack>
          <IconButton
            onClick={() => {
              setopenBlogMenu((p) => !p);
            }}
          >
            <MoreVertIcon />
          </IconButton>
          {openBlogMenu && (
            <div
              onMouseLeave={() => {
                setopenBlogMenu(false);
              }}
              style={{
                backgroundColor: "lavender",

                position: "absolute",
                borderRadius: "15px",
                boxShadow: "0px 1px 2px 0 black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <IconButton>
                <EditIcon sx={{ fontSize: "medium" }} />
              </IconButton>
              <IconButton
                onClick={() => {
                  setopenDialogBox(true);
                }}
              >
                <DeleteIcon sx={{ fontSize: "medium" }} />
              </IconButton>
              <IconButton  >
                <ShareIcon sx={{ fontSize: "medium" }} />
              </IconButton>
              <IconButton
                onClick={() => {
                  setopenBlogMenu(false);
                }}
              >
                <CloseIcon sx={{ fontSize: "medium" }} />
              </IconButton>
            </div>
          )}
        </Stack>
        {openDialogBox && (
          <DialogLayout setOpen={setopenDialogBox} open={openDialogBox}>
            <DialogContent
              sx={{
                padding: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Image
                src={deleteimg}
                style={{ height: "150px", width: "150px" }}
                alt="delete"
              />
              <Typography variant="h6" color="black">
                Are you sure?
              </Typography>
              <Typography variant="p">
                You wont be able to revert this!
              </Typography>
            </DialogContent>
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  "&:hover": { backgroundColor: "grey" },
                }}
                onClick={() => {
                  deleteHandler(id);
                }}
              >
                yes,delete it!
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": { backgroundColor: "grey" },
                }}
                onClick={() => {
                  setopenDialogBox(false);
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </DialogLayout>
        )}
      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* <Typography paragraph>{blog_contentHTMLBodyElement}</Typography> */}
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog_content) } }/>
        </CardContent>
      </Collapse>

      <Box
        sx={{
          float: "right",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "50px",
          width: "120px",
          justifyContent: "center",
        }}
      >
        <Button onClick={handleExpandClick} size="small">
          Learn More
        </Button>
      </Box>
    </Card>
  );
}

export default BlogCard;
