import axios from 'axios';
import { BASE_URL } from '~/modules/newsletter/__meta';
import { HookOptions } from '~/types';

export interface SignUpPayload {
    firstName: string,
    email: string
};

export type CreateSignUpOptions = HookOptions<"payload", SignUpPayload>

export async function createSignUp({ payload }: CreateSignUpOptions) {
    const { data } = await axios({
        method: "POST",
        url: `${BASE_URL}/signup`,
        data: payload
    });

    return data;
};