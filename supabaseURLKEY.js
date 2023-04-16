import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://swxgrjevtjkwtfbqdxgl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3eGdyamV2dGprd3RmYnFkeGdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE2MjY4NzgsImV4cCI6MTk5NzIwMjg3OH0.Fk0ODHGgNTGDAvF1HMz5w4oNXK0z2VkpapbQshkdpd8";
const supabaseURLKEY = createClient(supabaseUrl, supabaseKey);

export default supabaseURLKEY;
