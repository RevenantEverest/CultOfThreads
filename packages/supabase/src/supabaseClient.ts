import type { Database } from './database.types.js';
import { createClient } from '@supabase/supabase-js';

export type DatabaseItem<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T];

function getEnvVar(name: "SUPABASE_URL" | "SUPABASE_KEY"): string {
    if(typeof process !== "undefined" && process.env) {

        /*
            Explicitly returning NEXT_PUBLIC_... works where
            dynamically trying to access the env variable with
            process.env["NEXT_PUBLIC_..."] causes an error in Nextjs
        */
        if(name === "SUPABASE_KEY") {
            return process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
        }

        if(name === "SUPABASE_URL") {
            return process.env.NEXT_PUBLIC_SUPABASE_URL as string;
        }
    }

    if(import.meta.env) {
        const viteEnv = import.meta.env[`VITE_${name}`];
        if (viteEnv) return viteEnv;
    }

    throw new Error(`Missing Supabase Environment Variable: ${name}`);
};

const SUPABASE_URL = getEnvVar("SUPABASE_URL");
const SUPABASE_KEY = getEnvVar("SUPABASE_KEY");

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);