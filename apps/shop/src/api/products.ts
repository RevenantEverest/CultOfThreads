import type { DatabaseItem } from '@repo/ui';
import type { ProductDetails } from './productDetails';

import supabase from '@@shop/supabaseClient';
import { ProductMedia } from './productMedia';

export type Product = DatabaseItem<"products">["Row"];
export interface ProductWithDetails extends Product {
    product_details: ProductDetails | null
};

export interface ProductListing extends ProductWithDetails {
    product_media: ProductMedia[] | null
};

export interface ProductFull extends ProductWithDetails {
    product_media: ProductMedia[] | null
};

export async function fetchAll(): Promise<ProductListing[]> {
    const { data, error } = await (
        supabase.from('products')
        .select(`
            *,
            product_details (
                *
            ),
            product_media (
                *
            )
        `)
    ).limit(1, { foreignTable: "product_media" });
    
    if(error) {
        throw error;
    }

    return data ?? [];
};

export async function fetchById(id: string): Promise<ProductFull> {
    const { data, error } = await (
        supabase.from('products')
        .select(`
            *,
            product_details (
                *
            ),
            product_media (
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