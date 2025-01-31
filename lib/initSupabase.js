import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://kvxtymctfugwxupdjwao.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2eHR5bWN0ZnVnd3h1cGRqd2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1ODIxMzIsImV4cCI6MjAyMjE1ODEzMn0.bcOEbP2eUjLCWrjPF8_sSgG4zAVp6eEomnGMg5arJbU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
