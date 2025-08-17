import type { Product } from '../types/products.js';
import type { CreateProductMedia, ProductMedia } from '../types/productMedia.js';

import { supabase } from '../supabaseClient.js';
import { v4 as uuidGenerator } from 'uuid';

export async function getByProductId(productId: Product["id"]) {
    const { data, error } = await supabase.from('product_media').select().eq('product_id', productId);

    if(error) {
        throw error;
    }

    return data ?? [];
};

export async function create({ productId, file }: CreateProductMedia) {
    const uuid = uuidGenerator();

    const bucketPath = `/products/${productId}/${uuid}`;
    const fileUpload = await supabase.storage.from('content').upload(bucketPath, file);    
    
    if(fileUpload.error) {
        throw fileUpload.error;
    }

    const { data, error } = await supabase.from('product_media').insert({
        product_id: productId,
        type: file.type,
        media_url: fileUpload.data.fullPath
    });

    if(error) {
        throw error;
    }

    return data;
};

export async function destroy(productMedia: ProductMedia) {
    if(productMedia.media_url) {
        const fileDelete = await supabase.storage.from('content').remove([productMedia.media_url]);

        if(fileDelete.error) {
            throw fileDelete.error;
        }
    }

    const { data, error } = await supabase.from('product_media').delete().eq('id', productMedia.id);

    if(error) {
        throw error;
    }

    return data;
};