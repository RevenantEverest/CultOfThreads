import type { ApiResponse, HookOptions } from '~/types';
import type { Contact } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/contacts/__meta';

export interface CreatePayload {
    firstName: Contact["firstName"],
    email: Contact["email"],
    lastName?: Contact["lastName"],
    address?: Contact["address"],
    phone?: Contact["phone"],
};

export type CreateOptions = HookOptions<"authToken" | "payload", CreatePayload>;

export async function create({ authToken, payload }: CreateOptions): Promise<ApiResponse<Contact>> {
    const { data } = await axios({
        method: "POST",
        url: BASE_URL,
        data: payload,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return data;
};