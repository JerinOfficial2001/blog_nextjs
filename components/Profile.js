import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
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

export default function Profile({ open, close, session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [dob, setDob] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, dob, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setDob(data.dob);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, dob, avatar_url }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        username,
        dob,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

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
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="Dob"
            id="website"
            type="date"
            value={dob || ""}
            onChange={(e) => setDob(e.target.value)}
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
            onClick={() => updateProfile({ username, website, avatar_url })}
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </Button>
        </div>

        <div>
          <Button
            variant="outlined"
            sx={{
              borderColor: "red",
              "&:hover": { color: "white", backgroundColor: "red" },
              width: 200,
            }}
            onClick={() => supabase.auth.signOut()}
          >
            Sign Out
          </Button>
        </div>
      </Stack>
    </ModalLayout>
  );
}
