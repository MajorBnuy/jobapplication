import { SupabaseClient } from "./types";
import { createServerClient as original } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "./database.types";

export async function createServerClient(): Promise<SupabaseClient> {
  const cookieStore = await cookies();

  return original<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
