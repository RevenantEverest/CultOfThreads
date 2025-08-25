import type { DatabaseItem } from '../supabaseClient.js';

export type Category = DatabaseItem<"categories">["Row"];
export type CreateCategory = DatabaseItem<"categories">["Insert"];