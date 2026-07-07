import type { HookOptions } from '~/types';
import type { Tag } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/tags/__meta';

export interface DestroyOptions extends HookOptions<"authToken"> {
    id: Tag["id"]
};

export async function destroy({ id, authToken }: DestroyOptions) {
    const { data } = await axios({
        method: "DELETE",
        url: `${BASE_URL}/id/${id}`,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return data;
};