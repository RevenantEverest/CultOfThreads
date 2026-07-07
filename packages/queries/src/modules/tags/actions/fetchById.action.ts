import type { ApiResponse, HookOptions } from '~/types';
import type { Tag } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/tags/__meta';

export interface FetchByIdOptions extends HookOptions<"authToken"> {
    id: Tag["id"]
};

export async function fetchById({ id, authToken }: FetchByIdOptions): Promise<ApiResponse<Tag>> {
    const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/id/${id}`,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return data;
};