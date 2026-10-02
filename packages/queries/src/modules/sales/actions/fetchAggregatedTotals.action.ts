import type { ApiResponse, HookOptions } from '~/types';
import type { SalesAggregateResponse } from '@repo/types';

import axios from 'axios';
import { BASE_URL } from '~/modules/sales/__meta';

export type FetchAggregatedTotalsOptions = HookOptions<"authToken">;

export async function fetchAggregatedTotals({ authToken }: FetchAggregatedTotalsOptions): Promise<ApiResponse<SalesAggregateResponse>> {
    const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/aggregate/totals`,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return data;
};