import type { PaginatedResponse, HookOptions } from '~/types';

import axios from 'axios';
import { BASE_URL } from '~/modules/trafficAnalytics/__meta';
import { TrafficAnalytics } from '@repo/entities';

export type FetchAllOptions = HookOptions<"authToken" | "pagination">;

export async function fetchAll({ authToken, pagination }: FetchAllOptions): Promise<PaginatedResponse<TrafficAnalytics>> {

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