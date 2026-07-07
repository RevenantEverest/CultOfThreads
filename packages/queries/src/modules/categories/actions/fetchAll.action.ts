import type { HookOptions, PaginatedResponse } from '~/types';
import type { Category } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/categories/__meta';

export type FetchAllOptions = HookOptions<("authToken" | "pagination")>;

export async function fetchAll({ authToken, pagination }: FetchAllOptions): Promise<PaginatedResponse<Category>> {
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