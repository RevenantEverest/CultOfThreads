import type { ApiResponse, HookOptions } from '~/types';
import type { Category } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/categories/__meta';

export interface UpdatePayload {
    name: Category["name"]
};

export interface UpdateOptions extends HookOptions<("authToken" | "payload"), UpdatePayload> {
    id: Category["id"]
};

export async function update({ id, authToken, payload }: UpdateOptions): Promise<ApiResponse<Category>> {
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