import { type QueryClient, useMutation } from '@tanstack/react-query';
import { type DestroyOptions, destroy } from '~/modules/sales/actions';

import { AxiosError } from 'axios';
import { KEYS } from '~/modules/sales/__meta';

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
                    "Backend error response in destroy sale hook: ", 
                    err.response.data
                );
            }
            else {
                console.error("Generic error in destroy sale hook: ", err);
            }
        }
    });
};