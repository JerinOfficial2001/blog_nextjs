import Admin from "./admin";
import Container from "@mui/material/Container";
import NavBarUser from "@/components-user/NavBarUser";
import { useState } from "react";

const Home = () => {
  const [userpage, setuserpage] = useState(true)
 return(
  <>
  
  { userpage?  (
    <>
  <NavBarUser setuserpage={setuserpage}/>
    <Container
            maxWidth="el"
            sx={{
              backgroundColor: "lavender",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
             height:'100vh',
              width: "100%",
            }}
          >
            
          </Container>
          </>)
          :
 ( <Admin />)}
  </>
 )
};

export default Home;
