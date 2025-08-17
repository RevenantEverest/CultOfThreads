import type { DatabaseItem } from '@repo/ui';
import type { ProductDetails, CreateProductDetails } from './productDetails';
import supabase from '@@admin/supabaseClient';

import * as productDetailsApi from './productDetails';

export type Product = DatabaseItem<"products">["Row"];
export type CreateProduct = DatabaseItem<"products">["Insert"];

export interface ProductWithDetails extends Product {
    product_details: ProductDetails | null
};

export interface CreateParam extends CreateProduct {
    details: Omit<CreateProductDetails, "product_id">
};

export interface UpdateProduct extends CreateProduct {
    id: Product["id"],
    details: Omit<ProductDetails, "product_id">
};

export async function fetchAll(): Promise<ProductWithDetails[]> {
    const { data, error } = await (
        supabase.from('products')
        .select(`
            *,
            product_details (
                *
            )
        `)
    );
    
    if(error) {
        throw error;
    }

    return data ?? [];
};

export async function fetchById(id: string): Promise<ProductWithDetails> {
    const { data, error } = await (
        supabase.from('products')
        .select(`
            *,
            product_details (
                *
            )    
        `)
        .eq('id', id)
    );

    if(error) {
        throw error;
    }

    return data[0];
};

export async function create(productData: CreateParam) {
    const productRes = await (
        supabase.from('products')
        .insert({
            name: productData.name,
            description: productData.description,
        })
        .select()
    );

    if(productRes.error) {
        throw productRes.error;
    }

    const product = productRes.data[0];

    await productDetailsApi.create({
        product_id: product.id,
        online_price: productData.details.online_price,
        market_price: productData.details.market_price,
        status: productData.details.status,
        weight_grams: productData.details.weight_grams,
        etsy_listing: productData.details.etsy_listing
    });

    return product;
};

export async function update(product: UpdateProduct) {
    const productRes = await supabase.from('products').update({
        id: product.id,
        name: product.name,
        description: product.description
    }).eq('id', product.id).select();

    if(productRes.error) {
        throw productRes.error;
    }

    await productDetailsApi.update({
        product_id: product.id,
        ...product.details
    });

    return productRes.data;
};

export async function destroy(id: string) {
    const { data, error } = await supabase.from('products').delete().eq('id', id);

    if(error) {
        throw error;
    }

    return data;
};