import type { ApiResponse } from '~/types';

import axios from 'axios';
import { BASE_URL } from '~/modules/products/__meta';
import { Product } from '@repo/entities';

export async function fetchByBestSellersPublic(): Promise<ApiResponse<Product[]>> {
    const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/public/best-sellers`
    });

    return data;
};