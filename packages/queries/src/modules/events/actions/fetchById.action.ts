import type { ApiResponse, HookOptions } from '~/types';

import axios from 'axios';
import { BASE_URL } from '~/modules/events/__meta';
import { Event } from '@repo/entities';

export interface FetchByIdOptions extends HookOptions<"authToken"> {
    id: Event["id"]
};

export async function fetchById({ id, authToken }: FetchByIdOptions): Promise<ApiResponse<Event>> {
    const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/id/${id}`,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return data;
};