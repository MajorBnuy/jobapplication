import { SupabaseClient as Original } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/database.types";

export type SupabaseClient = Original<Database>