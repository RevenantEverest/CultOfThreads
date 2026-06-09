import type { ApiResponse, HookOptions } from '~/types';
import type { Event } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/events/__meta';

export interface CreatePayload {
    marketId: Event["market"]["id"],
    address: Event["address"],
    dateFrom: string,
    dateTo: string,
    file?: File
};

export type CreateOptions = HookOptions<"authToken" | "payload", CreatePayload>;

export async function create({ authToken, payload }: CreateOptions): Promise<ApiResponse<Event>> {

    const formData = new FormData();

    formData.append("marketId", payload.marketId);
    formData.append("address", payload.address);
    formData.append("dateFrom", payload.dateFrom);

    if(payload.dateTo) {
        formData.append("dateTo", payload.dateTo);
    }

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