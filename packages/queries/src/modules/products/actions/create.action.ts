import type { ApiResponse, HookOptions } from '~/types';
import type { Product, ProductDetails } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/products/__meta';

export interface CreatePayload {
    name: Product["name"],
    description?: string,
    marketPrice?: string,
    onlinePrice?: string,
    weightGrams?: string,
    status: ProductDetails["status"],
    etsyListing?: string,
    tags?: string[],
    categories?: string[],
    files?: File[]
};

export type CreateOptions = HookOptions<"authToken" | "payload", CreatePayload>;

export async function create({ authToken, payload }: CreateOptions): Promise<ApiResponse<Product>> {

    const formData = new FormData();

    formData.append("name", payload.name);
    formData.append("status", payload.status);

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

    if(payload.etsyListing) {
        formData.append("etsyListing", payload.etsyListing);
    }

    if(payload.tags) {
        formData.append("tags", JSON.stringify(payload.tags));
    }

    if(payload.categories) {
        formData.append("categories", JSON.stringify(payload.categories));
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
        method: "POST",
        url: BASE_URL,
        data: formData,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return data;
};