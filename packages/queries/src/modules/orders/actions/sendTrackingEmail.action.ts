import type { HookOptions } from '~/types';

import { Order } from '@repo/entities';
import axios from 'axios';
import { BASE_URL } from '~/modules/orders/__meta';

export interface SendTrackingEmailOptions extends HookOptions<"authToken"> {
    id: Order["id"]
};

export async function sendTrackingEmail({ id, authToken }: SendTrackingEmailOptions) {

    const { data } = await axios({
        method: "POST",
        url: `${BASE_URL}/id/${id}/email/tracking`,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return data;
};