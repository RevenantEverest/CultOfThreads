import { type QueryClient, useMutation } from '@tanstack/react-query';
import { type AddPaymentProviderOptions, addPaymentProvider } from '~/modules/products/actions';
import { AxiosError } from 'axios';

import { KEYS } from '~/modules/products/__meta';

export function useAddPaymentProvider(queryClient: QueryClient) {
    return useMutation({
        mutationFn: (options: AddPaymentProviderOptions) => addPaymentProvider(options),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: KEYS.lists()
            });

            queryClient.invalidateQueries({
                queryKey: KEYS.details(variables.id)
            });
        },
        onError: (err) => {
            if(err instanceof AxiosError && err.response) {
                console.error("Backend error response in add payment provider hook: ", err.response);
            }
            else {
                console.error("Generic error in add payment provider hook:", err);
            }
        }
    });
}