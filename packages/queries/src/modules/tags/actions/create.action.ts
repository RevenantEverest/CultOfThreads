import type { ApiResponse, HookOptions } from '~/types';
import type { Tag } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/tags/__meta';

export interface CreatePayload {
    name: Tag["name"]
};

export type CreateOptions = HookOptions<"authToken" | "payload", CreatePayload>;

export async function create({ authToken, payload }: CreateOptions): Promise<ApiResponse<Tag>> {
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