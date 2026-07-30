import type { ApiResponse, HookOptions } from '~/types';

import axios from 'axios';
import { BASE_URL } from '~/modules/contactForm/__meta';
import { ContactForm } from '@repo/entities';

export interface FetchByIdOptions extends HookOptions<"authToken"> {
    id: ContactForm["id"]
};

export async function fetchById({ id, authToken }: FetchByIdOptions): Promise<ApiResponse<ContactForm>> {
    const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/id/${id}`,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return data;
};