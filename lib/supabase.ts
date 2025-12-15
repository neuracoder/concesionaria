import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rfwahweevepijnejcqwb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmd2Fod2VldmVwaWpuZWpjcXdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NjcwNjksImV4cCI6MjA4MTM0MzA2OX0.4iR27NnLzAql_JB_rCvfe5S7M2cRthF1asIPBOk9Oro';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
