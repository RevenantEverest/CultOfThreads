import type { DatabaseItem } from '../supabaseClient.js';
import type { ProductDetails, CreateProductDetails } from './productDetails.js';
import type { ProductMedia } from './productMedia.js';

export type Product = DatabaseItem<"products">["Row"];
export type CreateProduct = DatabaseItem<"products">["Insert"];

export interface ProductWithDetails extends Product {
    product_details: ProductDetails | null
};

export interface CreateProductParams extends CreateProduct {
    details: Omit<CreateProductDetails, "product_id">
};

export interface UpdateProductParams extends CreateProduct {
    id: Product["id"],
    details: Omit<ProductDetails, "product_id">
};

export interface ProductListing extends ProductWithDetails {
    product_media: ProductMedia[] | null
};