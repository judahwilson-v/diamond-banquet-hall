import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://awzffyogkxsyiidajkmt.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3emZmeW9na3hzeWlpZGFqa210Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NzI4MjAsImV4cCI6MjA5MDU0ODgyMH0.tkZ4yGJBmikTYBbqNOuIXRljsL1uEfixj3CqiBSLwYs";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

export const supabaseClient = supabase;
export { SUPABASE_URL, SUPABASE_ANON_KEY };
