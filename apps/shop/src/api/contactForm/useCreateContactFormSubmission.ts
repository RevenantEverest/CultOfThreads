import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { URLS } from '@@shop/constants';

export interface ContactFormSubmission {
    firstName: string,
    lastName: string,
    email: string,
    message: string
};

export async function createSubmission(submission: ContactFormSubmission) {
    console.log("URL => ", URLS.API_URL);
    const { data } = await axios({
        method: "POST",
        url: `${URLS.API_URL}/contact-form`,
        data: submission
    });

    return data;
};

export function useCreateContactFormSubmission() {
    const queryClient = new QueryClient();
    const mutation = useMutation({
        mutationFn: (submission: ContactFormSubmission) => createSubmission(submission),
        onError: (error) => {
            console.error("Error submitting form: ", error.message)
        }
    });

    return {
        queryClient,
        ...mutation,
    };
};