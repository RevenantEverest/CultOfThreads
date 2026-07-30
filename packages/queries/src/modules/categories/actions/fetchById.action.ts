import type { ApiResponse, HookOptions } from '~/types';
import type { Category } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/categories/__meta';

export interface FetchByIdOptions extends HookOptions<"authToken"> {
    id: Category["id"]
};

export async function fetchById({ id, authToken }: FetchByIdOptions): Promise<ApiResponse<Category>> {
    const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/id/${id}`,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return data;
};