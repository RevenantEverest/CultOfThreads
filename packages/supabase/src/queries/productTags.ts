import {
    ProductTag,
    CreateProductTag
} from '../types/productTags.js';

import { supabase } from '../supabaseClient.js';

export async function fetchAll(): Promise<ProductTag[]> {
    const { data, error } = await (
        supabase.from("product_tags").select()
    );

    if(error) {
        throw error;
    }

    return data ?? [];
};

export async function fetchById(id: string): Promise<ProductTag> {
    const { data, error } = await (
        supabase.from("product_tags").select().eq("id", id)
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Data is null");
    }

    return data[0];
};

export async function create(tagData: CreateProductTag): Promise<ProductTag> {
    const { data, error } = await (
        supabase.from("product_tags").insert({
            tag_id: tagData.tag_id,
            product_id: tagData.product_id
        }).select()
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Product Tag is missing");
    }

    return data[0];
};

export async function destroy({ tagId, productId }: { tagId: string, productId: string }) {
    const { data, error } = await (
        supabase.from("product_tags").delete().eq("tag_id", tagId).eq("product_id", productId)
    );

    if(error) {
        throw error;
    };

    return data;
};