import type { HookOptions } from '~/types';
import type { Product } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/products/__meta';

export interface DestroyOptions extends HookOptions<"authToken"> {
    id: Product["id"]
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