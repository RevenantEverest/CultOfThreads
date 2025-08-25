import { DatabaseItem } from '../supabaseClient.js';

export type Tag = DatabaseItem<"tags">["Row"];
export type CreateTag = DatabaseItem<"tags">["Insert"];