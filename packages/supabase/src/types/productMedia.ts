import type { DatabaseItem } from '../supabaseClient.js';
import type { Product } from './products.js';

export type ProductMedia = DatabaseItem<"product_media">["Row"];
export type UpdateProductMedia = DatabaseItem<"product_media">["Update"];

export interface CreateProductMedia {
    productId: Product["id"],
    file: File
};