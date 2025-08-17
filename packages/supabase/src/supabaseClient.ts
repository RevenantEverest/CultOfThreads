import type { Database } from './database.types.js';
import { createClient } from '@supabase/supabase-js';

// const NEXT_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const NEXT_SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

export type DatabaseItem<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T];

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if(!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Missing Supabase Environment Variables");
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);