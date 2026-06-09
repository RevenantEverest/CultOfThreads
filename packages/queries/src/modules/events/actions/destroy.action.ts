import type { HookOptions } from '~/types';
import type { Event } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/events/__meta';

export interface DestroyOptions extends HookOptions<"authToken"> {
    id: Event["id"]
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