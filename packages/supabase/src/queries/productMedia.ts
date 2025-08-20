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

    const fileExtension = file.type.split("/")[1];
    const bucketPath = `/products/${productId}/${uuid}.${fileExtension}`;
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
        const path = productMedia.media_url.split("content/")[1];

        if(!path) {
            throw new Error("Path is invalid");
        }

        const fileDelete = await supabase.storage.from('content').remove([path]);

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