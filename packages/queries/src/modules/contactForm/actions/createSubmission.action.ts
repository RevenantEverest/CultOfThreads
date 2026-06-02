import axios from 'axios';
import { BASE_URL } from '~/modules/contactForm/__meta';
import { HookOptions } from '~/types';

export interface SubmissionPayload {
    firstName: string,
    lastName: string,
    email: string,
    message: string
};

export type CreateSubmissionOptions = HookOptions<"payload", SubmissionPayload>;

export async function createSubmission({ payload }: CreateSubmissionOptions) {
    const { data } = await axios({
        method: "POST",
        url: BASE_URL,
        data: payload
    });

    return data;
};