import { type QueryClient, useMutation } from '@tanstack/react-query';
import { type UpdateOptions, update } from '~/modules/contactForm/actions';
import { AxiosError } from 'axios';

import { KEYS } from '~/modules/contactForm/__meta';

export function useUpdate(queryClient: QueryClient) {
    return useMutation({
        mutationFn: (options: UpdateOptions) => update(options),
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
                console.error(
                    "Backend error response in update contact form submission hook: ", 
                    err.response.data
                );
            }
            else {
                console.error(
                    "Generic error in update contact form submission hook: ", 
                    err
                );
            }
        }
    });
};