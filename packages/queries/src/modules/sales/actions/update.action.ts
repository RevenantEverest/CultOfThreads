import type { ApiResponse, HookOptions } from '~/types';

import { Sale } from '@repo/entities';
import axios from 'axios';
import { BASE_URL } from '~/modules/sales/__meta';

export interface UpdatePayload {
    productId?: string,
    saleType?: Sale["saleType"],
    salePrice?: string,
    purchaseDate?: string,
    productName?: string,
    originalProductPrice?: string,
    notes?: string,
    eventId?: string,
    marketName?: string
};

export interface UpdateOptions extends HookOptions<"authToken" | "payload", UpdatePayload> {
    id: Sale["id"]
};

export async function update({ id, authToken, payload }: UpdateOptions): Promise<ApiResponse<Sale>> {

    const { data } = await axios({
        method: "PUT",
        url: `${BASE_URL}/id/${id}`,
        data: payload,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return data;
};