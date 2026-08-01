import type { ApiResponse, HookOptions } from '~/types';
import type { ContactForm } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/contactForm/__meta';

export interface UpdatePayload {
    status: ContactForm["status"]
};

export interface UpdateOptions extends HookOptions<"authToken" | "payload", UpdatePayload> {
    id: ContactForm["id"]
};

export async function update({ id, authToken, payload }: UpdateOptions): Promise<ApiResponse<ContactForm>> {
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