import type { DatabaseItem } from '../supabaseClient.js';
import type { Category } from './categories.js';

export type ProductCategory = DatabaseItem<"product_categories">["Row"];
export type CreateProductCategory = DatabaseItem<"product_categories">["Insert"];

export interface ProductCategoryFull extends ProductCategory {
    category: Category
};