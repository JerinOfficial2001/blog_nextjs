import "../styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { store } from "../store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  const supabase = createClient(
    "https://lasgxxgmfesdaxesuymf.supabase.co",
    " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxhc2d4eGdtZmVzZGF4ZXN1eW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzMTI0NTYsImV4cCI6MTk5NTg4ODQ1Nn0.x_SiccZtKLhcigb8barQPKt2GMeWm58q85HChiqc_fo"
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
