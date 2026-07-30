import type { ApiResponse, HookOptions } from '~/types';

import axios from 'axios';
import { BASE_URL } from '~/modules/contacts/__meta';
import { Contact } from '@repo/entities';

export interface FetchByIdOptions extends HookOptions<"authToken"> {
    id: Contact["id"]
};

export async function fetchById({ id, authToken }: FetchByIdOptions): Promise<ApiResponse<Contact>> {
    const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/id/${id}`,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return data;
};