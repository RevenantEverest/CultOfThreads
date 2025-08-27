import type { DatabaseItem } from '../supabaseClient.js';
import type { Tag } from './tags.js';

export type ProductTag = DatabaseItem<"product_tags">["Row"];
export type CreateProductTag = DatabaseItem<"product_tags">["Insert"];

export interface ProductTagFull extends ProductTag {
    tag: Tag
};