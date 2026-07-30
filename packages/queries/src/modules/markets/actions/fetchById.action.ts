import type { ApiResponse, HookOptions } from '~/types';

import axios from 'axios';
import { BASE_URL } from '~/modules/markets/__meta';
import { Market } from '@repo/entities';

export interface FetchByIdOptions extends HookOptions<"authToken"> {
    id: Market["id"]
};

export async function fetchById({ id, authToken }: FetchByIdOptions): Promise<ApiResponse<Market>> {
    const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/id/${id}`,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return data;
};