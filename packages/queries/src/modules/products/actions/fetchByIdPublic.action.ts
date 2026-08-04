import type { ApiResponse, HookOptions } from '~/types';

import axios from 'axios';
import { BASE_URL } from '~/modules/products/__meta';
import { Product } from '@repo/entities';

export interface FetchByIdPublicOptions extends HookOptions<"headers"> {
    id: Product["id"]
};

export async function fetchByIdPublic({ id, headers }: FetchByIdPublicOptions): Promise<ApiResponse<Product>> {
    const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/public/id/${id}`,
        ...(headers && { headers })
    });

    return data;
};