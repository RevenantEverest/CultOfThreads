import { type QueryClient, useMutation } from '@tanstack/react-query';
import { type CreateOptions, create } from '~/modules/tags/actions';

import { AxiosError } from 'axios';
import { KEYS } from '~/modules/tags/__meta';

export function useCreate(queryClient: QueryClient) {
    return useMutation({
        mutationFn: (options: CreateOptions) => create(options),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: KEYS.lists()
            });
        },
        onError: (err) => {
            if(err instanceof AxiosError && err.response) {
                console.error(
                    "Backend error response in create tag hook: ", 
                    err.response.data
                );
            }
            else {
                console.error("Generic error in create tag hook: ", err);
            }
        }
    })
};