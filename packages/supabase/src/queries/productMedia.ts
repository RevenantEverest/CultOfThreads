import type { Product } from '../types/products.js';
import type { CreateProductMedia, ProductMedia } from '../types/productMedia.js';

import { supabase } from '../supabaseClient.js';

import { storage } from '../utils/index.js';

export async function getByProductId(productId: Product["id"]) {
    const { data, error } = await supabase.from('product_media').select().eq('product_id', productId);

    if(error) {
        throw error;
    }

    return data ?? [];
};

export async function create({ productId, file }: CreateProductMedia) {
    const fullPath = await storage.create("content", `products/${productId}`, file);

    const { data, error } = await supabase.from('product_media').insert({
        product_id: productId,
        type: file.type,
        media_url: fullPath
    });

    if(error) {
        throw error;
    }

    return data;
};

export async function destroy(productMedia: ProductMedia) {
    if(productMedia.media_url) {
        await storage.destroy("content", productMedia.media_url);
    }

    const { data, error } = await supabase.from('product_media').delete().eq('id', productMedia.id);

    if(error) {
        throw error;
    }

    return data;
};