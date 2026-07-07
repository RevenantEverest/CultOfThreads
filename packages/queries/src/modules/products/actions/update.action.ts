import type { ApiResponse, HookOptions } from '~/types';
import type { Product, ProductDetails } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/products/__meta';

export interface UpdatePayload {
    name?: Product["name"],
    description?: string,
    marketPrice?: string,
    onlinePrice?: string,
    weightGrams?: string,
    status?: ProductDetails["status"],
    etsyListing?: string,
    tags?: string[],
    categories?: string[],
    media: Product["media"],
    files?: File[]
};

export interface UpdateOptions extends HookOptions<"authToken" | "payload", UpdatePayload> {
    id: Product["id"]
};

export async function update({ id, authToken, payload }: UpdateOptions): Promise<ApiResponse<Product>> {
    const formData = new FormData();

    if(payload.name) {
        formData.append("name", payload.name);
    }

    if(payload.description) {
        formData.append("description", payload.description);
    }

    if(payload.marketPrice) {
        formData.append("marketPrice", payload.marketPrice.toString());
    }

    if(payload.onlinePrice) {
        formData.append("onlinePrice", payload.onlinePrice.toString());
    }

    if(payload.weightGrams) {
        formData.append("weightGrams", payload.weightGrams.toString());
    }

    if(payload.status) {
        formData.append("status", payload.status);
    }

    if(payload.etsyListing) {
        formData.append("etsyListing", payload.etsyListing);
    }

    if(payload.tags) {
        formData.append("tags", JSON.stringify(payload.tags));
    }

    if(payload.categories) {
        formData.append("categories", JSON.stringify(payload.categories));
    }

    if(payload.media) {
        formData.append("media", JSON.stringify(payload.media));
    }

    if(payload.files) {
        for(let i = 0; i < payload.files.length; i++) {
            const currentFile = payload.files[i];

            if(!currentFile) {
                continue;
            }

            formData.append("files", currentFile);
        }
    }
    
    const { data } = await axios({
        method: "PUT",
        url: `${BASE_URL}/id/${id}`,
        data: formData,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return data;
};