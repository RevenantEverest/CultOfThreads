import type { ApiResponse, HookOptions } from '~/types';

import axios from 'axios';
import { BASE_URL } from '~/modules/checkout/__meta';

export interface CheckoutItem {
    productId: string,
    quantity: number
};

export interface CheckoutPayload {
    items: CheckoutItem[]
};

export type CreateCheckoutSessionOptions = HookOptions<"payload", CheckoutPayload>;

export async function createCheckoutSession({ payload }: CreateCheckoutSessionOptions): Promise<ApiResponse<{ url: string }>> {
    const { data } = await axios({
        method: "POST",
        url: BASE_URL,
        data: payload
    });

    return data;
};