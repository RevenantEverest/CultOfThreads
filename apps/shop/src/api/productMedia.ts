import type { DatabaseItem } from '@repo/ui';
import type { Product } from './products';

import supabase from '@@shop/supabaseClient';

export type ProductMedia = DatabaseItem<"product_media">["Row"];

export async function getByProductId(productId: Product["id"]) {
    const { data, error } = await supabase.from('product_media').select().eq('product_id', productId);

    if(error) {
        throw error;
    }

    return data ?? [];
};