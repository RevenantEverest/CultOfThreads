import type { DatabaseItem } from '@repo/ui';
import supabase from '@@admin/supabaseClient';

export type ProductDetailsStatus = "ACTIVE" | "DRAFT";

export type ProductDetailsRow = DatabaseItem<"product_details">["Row"];
export interface ProductDetails extends ProductDetailsRow {
    status: string | ProductDetailsStatus
};

export type ProductDetailsInsert = DatabaseItem<"product_details">["Insert"];
export interface CreateProductDetails extends ProductDetailsInsert {
    status: ProductDetailsStatus
};

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