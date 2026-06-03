import type { ApiResponse, HookOptions } from '~/types';
import type { Contact } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/contacts/__meta';

export interface UpdatePayload {
    firstName?: Contact["firstName"],
    email?: Contact["email"],
    lastName?: Contact["lastName"],
    address?: Contact["address"],
    phone?: Contact["phone"],
};

export interface UpdateOptions extends HookOptions<"authToken" | "payload", UpdatePayload> {
    id: Contact["id"]
};

export async function update({ id, authToken, payload }: UpdateOptions): Promise<ApiResponse<Contact>> {
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