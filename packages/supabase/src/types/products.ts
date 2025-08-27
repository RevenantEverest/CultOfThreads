import type { DatabaseItem } from '../supabaseClient.js';
import { ProductCategoryFull } from './productCategories.js';
import type { ProductDetails, CreateProductDetails } from './productDetails.js';
import type { ProductMedia } from './productMedia.js';
import { ProductTagFull } from './productTags.js';

export type Product = DatabaseItem<"products">["Row"];
export type CreateProduct = DatabaseItem<"products">["Insert"];

export interface ProductWithDetails extends Product {
    details: ProductDetails | null
};

export interface CreateProductParams extends CreateProduct {
    details: Omit<CreateProductDetails, "product_id">
};

export interface UpdateProductParams extends CreateProduct {
    id: Product["id"],
    details: Omit<ProductDetails, "product_id">
};

export interface ProductListing extends ProductWithDetails {
    media: ProductMedia[] | null,
    categories: ProductCategoryFull[] | null,
    tags: ProductTagFull[] | null
};