import { env } from "@/config/create-env";
import type { Database } from "@/types/database.types";
// src/lib/supabase/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = env.VITE_APP_DATABASE_URL;
const supabaseAnonKey = env.VITE_APP_DATABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
