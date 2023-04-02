import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lasgxxgmfesdaxesuymf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxhc2d4eGdtZmVzZGF4ZXN1eW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzMTI0NTYsImV4cCI6MTk5NTg4ODQ1Nn0.x_SiccZtKLhcigb8barQPKt2GMeWm58q85HChiqc_fo";
const supabaseURLKEY = createClient(supabaseUrl, supabaseKey);

export default supabaseURLKEY;
