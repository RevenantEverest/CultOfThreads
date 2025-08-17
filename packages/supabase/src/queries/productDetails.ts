import type { CreateProductDetails, ProductDetails } from '../types/productDetails.js';
import { supabase } from '../supabaseClient.js';

export async function create(details: CreateProductDetails) {
    const { data, error } = await (
        supabase.from('product_details').insert(details).select()
    );

    if(error) {
        throw error;
    }

    return data[0];
};

export async function update(details: ProductDetails) {
    const { data, error } = await (
        supabase.from('product_details').update(details).eq('id', details.id).select()
    );

    if(error) {
        throw error;
    }

    return data;
};