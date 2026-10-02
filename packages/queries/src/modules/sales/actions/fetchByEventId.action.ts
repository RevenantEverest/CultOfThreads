import type { ApiResponse, HookOptions } from '~/types';

import axios from 'axios';
import { BASE_URL } from '~/modules/sales/__meta';
import { Sale, Event } from '@repo/entities';

export interface FetchByEventIdOptions extends HookOptions<"authToken"> {
    id: Event["id"]
};

export async function fetchByEventId({ id, authToken }: FetchByEventIdOptions): Promise<ApiResponse<Sale[]>> {
    const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/events/${id}`,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return data;
};