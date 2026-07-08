import type { HookOptions, PaginatedResponse } from '~/types';

import axios from 'axios';
import { BASE_URL } from '~/modules/products/__meta';
import { Product } from '@repo/entities';

export interface FetchAllPublicOptions extends HookOptions<"pagination"> {
    query?: string
};

export async function fetchAllPublic({ pagination, query }: FetchAllPublicOptions): Promise<PaginatedResponse<Product>> {

    const { page=1, limit=10 } = pagination;
    const { data } = await axios({
        method: "GET",
        params: { page, limit, query },
        url: `${BASE_URL}/public`
    });

    return data;
};