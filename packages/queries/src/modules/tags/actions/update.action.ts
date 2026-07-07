import type { ApiResponse, HookOptions } from '~/types';
import type { Tag } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/tags/__meta';

export interface UpdatePayload {
    name: Tag["name"]
};

export interface UpdateOptions extends HookOptions<("authToken" | "payload"), UpdatePayload> {
    id: Tag["id"]
};

export async function update({ id, authToken, payload }: UpdateOptions): Promise<ApiResponse<Tag>> {
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