import type { DatabaseItem } from '../supabaseClient.js';

export type ProductDetailsStatus = "ACTIVE" | "DRAFT";

export type ProductDetailsRow = DatabaseItem<"product_details">["Row"];
export interface ProductDetails extends ProductDetailsRow {
    status: string | ProductDetailsStatus
};

export type ProductDetailsInsert = DatabaseItem<"product_details">["Insert"];
export interface CreateProductDetails extends ProductDetailsInsert {
    status: ProductDetailsStatus
};