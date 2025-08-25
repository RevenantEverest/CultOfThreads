import { DatabaseItem } from '../supabaseClient.js';

export type ProductCategory = DatabaseItem<"product_categories">["Row"];
export type CreateProductCategory = DatabaseItem<"product_categories">["Insert"];