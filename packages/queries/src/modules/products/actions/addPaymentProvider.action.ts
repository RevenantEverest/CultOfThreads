import type { HookOptions } from '~/types';
import type { Product } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/products/__meta';

type ProviderTarget = "STRIPE" | "SQUARE";

export interface AddPaymentProviderPayload {
    providerTarget: ProviderTarget
};

export interface AddPaymentProviderOptions extends HookOptions<"authToken" | "payload", AddPaymentProviderPayload> {
    id: Product["id"]
};

export async function addPaymentProvider({ id, authToken, payload }: AddPaymentProviderOptions) {
    const { data } = await axios({
        method: "POST",
        url: `${BASE_URL}/id/${id}/payment-providers`,
        data: payload,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return data;
};