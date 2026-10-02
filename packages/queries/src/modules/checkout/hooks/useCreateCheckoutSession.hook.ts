import { useMutation } from '@tanstack/react-query';
import { type CreateCheckoutSessionOptions, createCheckoutSession } from '~/modules/checkout/actions';
import { AxiosError } from 'axios';

export function useCreateCheckoutSession() {
    return useMutation({
        mutationFn: (options: CreateCheckoutSessionOptions) => createCheckoutSession(options),
        onError: (err) => {
            if(err instanceof AxiosError && err.response) {
                console.error("Backend error response in create checkout session hook: ", err.response);
            }
            else {
                console.error("Generic error in create checkout session hook:", err);
            }
        } 
    });
};