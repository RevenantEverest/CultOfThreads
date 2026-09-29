import type { ApiResponse, HookOptions } from '~/types';

import { Order } from '@repo/entities';
import axios from 'axios';
import { BASE_URL } from '~/modules/orders/__meta';

export interface UpdatePayload {
    status: Order["status"],
    customerEmail?: Order["customerEmail"],
    customerName?: Order["customerName"],
    billingAddress?: Order["billingAddress"],
    shippingAddress?: Order["shippingAddress"],
    shippingOption?: Order["shippingOption"],
    trackingNumber?: Order["trackingNumber"]
};

export interface UpdateOptions extends HookOptions<"authToken" | "payload", UpdatePayload> {
    id: Order["id"]
};

export async function update({ id, authToken, payload }: UpdateOptions): Promise<ApiResponse<Order>> {

    const { data } = await axios({
        method: "PUT",
        url: `${BASE_URL}/id/${id}`,
        data: payload,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return data;
};