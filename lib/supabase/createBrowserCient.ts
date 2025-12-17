import { createBrowserClient as original } from "@supabase/ssr";
import { Database } from "./database.types";
import { SupabaseClient } from "./types";


export function createBrowserClient(): SupabaseClient {
  return original<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
