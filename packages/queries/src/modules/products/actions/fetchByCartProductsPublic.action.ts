import type { HookOptions, ApiResponse } from '~/types';

import axios from 'axios';
import { BASE_URL } from '~/modules/products/__meta';
import { Product } from '@repo/entities';

export interface CartProductsPublicPayload {
    productIds: string[]
};

export type FetchCartProductsPublicOptions = HookOptions<"payload", CartProductsPublicPayload>;

export async function fetchCartProductsPublic({ payload }: FetchCartProductsPublicOptions): Promise<ApiResponse<Product[]>> {

    const { data } = await axios({
        method: "POST",
        url: `${BASE_URL}/public/cart`,
        data: payload
    });

    return data;
};