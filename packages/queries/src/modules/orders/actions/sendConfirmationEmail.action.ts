import type { HookOptions } from '~/types';

import { Order } from '@repo/entities';
import axios from 'axios';
import { BASE_URL } from '~/modules/orders/__meta';

export interface SendConfirmationEmailOptions extends HookOptions<"authToken"> {
    id: Order["id"]
};

export async function sendConfirmationEmail({ id, authToken }: SendConfirmationEmailOptions) {

    const { data } = await axios({
        method: "POST",
        url: `${BASE_URL}/id/${id}/email/confirmation`,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return data;
};