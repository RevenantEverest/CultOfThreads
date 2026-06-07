import type { ApiResponse, HookOptions } from '~/types';
import type { Market, MarketDetails } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/markets/__meta';

export interface UpdatePayload {
    name?: Market["name"],
    state?: MarketDetails["state"],
    file?: File 
};

export interface UpdateOptions extends HookOptions<"authToken" | "payload", UpdatePayload> {
    id: Market["id"]
};

export async function update({ id, authToken, payload }: UpdateOptions): Promise<ApiResponse<Market>> {
    const formData = new FormData();
    
    if(payload.name) {
        formData.append("name", payload.name);
    }

    if(payload.state) {
        formData.append("state", payload.state);
    }

    if(payload.file) {
        formData.append("file", payload.file);
    }

    console.log(payload, formData);
    
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