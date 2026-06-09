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
