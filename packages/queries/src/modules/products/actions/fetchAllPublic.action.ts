import type { HookOptions, PaginatedResponse } from '~/types';

import axios from 'axios';
import { BASE_URL } from '~/modules/products/__meta';
import { Product } from '@repo/entities';

export type FetchAllPublicOptions = HookOptions<"pagination">;

export async function fetchAllPublic({ pagination }: FetchAllPublicOptions): Promise<PaginatedResponse<Product>> {
    const { page=1, limit=10 } = pagination;
    const { data } = await axios({
        method: "GET",
        params: { page, limit },
        url: `${BASE_URL}/public`
    });

    return data;
};