import type { ApiResponse, HookOptions } from '~/types';

import { Sale } from '@repo/entities';
import axios from 'axios';
import { BASE_URL } from '~/modules/sales/__meta';

export interface CreatePayload {
    saleType: Sale["saleType"],
    salePrice: string,
    purchaseDate: string,
    productName: string,
    originalProductPrice: string,
    productId?: string,
    notes?: string,
    eventId?: string,
    marketName?: string
};

export type CreateOptions = HookOptions<"authToken" | "payload", CreatePayload>;

export async function create({ authToken, payload }: CreateOptions): Promise<ApiResponse<Sale>> {

    const { data } = await axios({
        method: "POST",
        url: `${BASE_URL}`,
        data: payload,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return data;
};