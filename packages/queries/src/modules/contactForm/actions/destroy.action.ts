import type { HookOptions } from '~/types';
import type { ContactForm } from '@repo/entities';

import axios from 'axios';
import { BASE_URL } from '~/modules/contactForm/__meta';

export interface DestroyOptions extends HookOptions<"authToken"> {
    id: ContactForm["id"]
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