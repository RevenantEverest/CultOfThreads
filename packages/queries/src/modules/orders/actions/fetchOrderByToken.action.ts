import type { ApiResponse, HookOptions } from '~/types';

import axios from 'axios';
import { BASE_URL } from '~/modules/orders/__meta';
import { Order } from '@repo/entities';

export type FetchOrderByTokenOptions = HookOptions<"authToken">;

export async function fetchOrderByToken({ authToken }: FetchOrderByTokenOptions): Promise<ApiResponse<Order>> {
    const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/view`,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return data;
};