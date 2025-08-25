import {
    CreateProductCategory,
    ProductCategory
} from '../types/productCategories.js';

import { supabase } from '../supabaseClient.js';

export async function fetchAll(): Promise<ProductCategory[]> {
    const { data, error } = await supabase.from("product_categories").select();

    if(error) {
        throw error;
    }

    return data ?? [];
};

export async function fetchById(id: string): Promise<ProductCategory> {
    const { data, error } = await supabase.from("product_categories").select().eq("id", id)

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Data is null");
    }

    return data[0];
};

export async function create(categoryData: CreateProductCategory): Promise<ProductCategory> {
    const { data, error } = await (
        supabase.from("product_categories").insert({
            category_id: categoryData.category_id,
            product_id: categoryData.product_id
        }).select()
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Product Category is missing");
    }

    return data[0];
};

export async function destroy(category: ProductCategory) {
    const { data, error } = await (
        supabase.from("product_categories").delete().eq("id", category.id)
    ); 

    if(error) {
        throw error;
    }

    return data;
}