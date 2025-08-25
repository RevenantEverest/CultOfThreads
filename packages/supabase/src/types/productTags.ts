import { DatabaseItem } from '../supabaseClient.js';

export type ProductTag = DatabaseItem<"product_tags">["Row"];
export type CreateProductTag = DatabaseItem<"product_tags">["Insert"];