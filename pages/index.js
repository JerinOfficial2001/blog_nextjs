import Admin from "./admin";
import Container from "@mui/material/Container";
import NavBarUser from "@/components-user/NavBarUser";
import { useState } from "react";
import UserPage from "./userPage";
import { useSession } from "@supabase/auth-helpers-react";
import Homepage from "./homepage";

const Home = () => {
  const session = useSession();
  const [userpage, setuserpage] = useState(false)
 return(
  <>


 {!session?
 (<>
   <NavBarUser />
    <Container
            
            sx={{
              backgroundColor: "lavender",
            }}
          >
            <UserPage/>
          </Container> </> ):(
          <>
            <Homepage session={session} />
          
          </>
        )}
  </>
 )
};

export default Home;
