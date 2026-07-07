import { type QueryClient, useMutation } from '@tanstack/react-query';
import { type DestroyOptions, destroy } from '~/modules/categories/actions';

import { AxiosError } from 'axios';
import { KEYS } from '~/modules/categories/__meta';

export function useDestroy(queryClient: QueryClient) {
    return useMutation({
        mutationFn: (options: DestroyOptions) => destroy(options),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: KEYS.lists()
            });
        },
        onError: (err) => {
            if(err instanceof AxiosError && err.response) {
                console.error(
                    "Backend error response in destroy category hook: ", 
                    err.response.data
                );
            }
            else {
                console.error("Generic error in destroy category hook: ", err);
            }
        }
    });
};