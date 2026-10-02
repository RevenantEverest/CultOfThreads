import type { HookOptions, PaginatedResponse } from '~/types';

import axios from 'axios';
import { BASE_URL } from '~/modules/orders/__meta';
import { Order } from '@repo/entities';

export type FetchAllOptions = HookOptions<("authToken" | "pagination")>;

export async function fetchAll({ authToken, pagination }: FetchAllOptions): Promise<PaginatedResponse<Order>> {

    const { page=1, limit=10 } = pagination;
    const { data } = await axios({
        method: "GET",
        params: { page, limit },
        url: BASE_URL,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return data;
};