import type { ApiResponse, HookOptions } from '~/types';
import type { Event } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/events/__meta';

export interface UpdatePayload {
    marketId?: Event["market"]["id"],
    address?: Event["address"],
    dateFrom?: string,
    dateTo?: string,
    file?: File
};

export interface UpdateOptions extends HookOptions<"authToken" | "payload", UpdatePayload> {
    id: Event["id"]
};

export async function update({ id, authToken, payload }: UpdateOptions): Promise<ApiResponse<Event>> {
    
    const formData = new FormData();

    if(payload.marketId) {
        formData.append("marketId", payload.marketId);
    }

    if(payload.address) {
        formData.append("address", payload.address);
    }

    if(payload.dateFrom) {
        formData.append("dateFrom", payload.dateFrom);
    }

    if(payload.dateTo) {
        formData.append("dateTo", payload.dateTo);
    }

    if(payload.file) {
        formData.append("file", payload.file);
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
