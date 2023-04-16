import "../styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { store } from "../store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  const supabase = createClient(
    "https://swxgrjevtjkwtfbqdxgl.supabase.co",
    " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3eGdyamV2dGprd3RmYnFkeGdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE2MjY4NzgsImV4cCI6MTk5NzIwMjg3OH0.Fk0ODHGgNTGDAvF1HMz5w4oNXK0z2VkpapbQshkdpd8"
  );

  return (
    <Provider store={store}>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <Component {...pageProps} />
      </SessionContextProvider>
    </Provider>
  );
}
export default MyApp;
