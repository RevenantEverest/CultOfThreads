import type { HookOptions, PaginatedResponse } from '~/types';
import type { Tag } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/tags/__meta';

export type FetchAllOptions = HookOptions<("authToken" | "pagination")>;

export async function fetchAll({ authToken, pagination }: FetchAllOptions): Promise<PaginatedResponse<Tag>> {
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