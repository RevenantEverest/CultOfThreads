import type { ApiResponse, HookOptions } from '~/types';
import type { Market, MarketDetails } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/markets/__meta';

export interface CreatePayload {
    name: Market["name"],
    state: MarketDetails["state"],
    file?: File
};

export type CreateOptions = HookOptions<"authToken" | "payload", CreatePayload>;

export async function create({ authToken, payload }: CreateOptions): Promise<ApiResponse<Market>> {
    const formData = new FormData();

    formData.append("name", payload.name);
    formData.append("state", payload.state);

    if(payload.file) {
        formData.append("file", payload.file);
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