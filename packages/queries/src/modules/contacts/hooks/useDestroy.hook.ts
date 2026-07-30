import { type QueryClient, useMutation } from '@tanstack/react-query';
import { type DestroyOptions, destroy } from '~/modules/contacts/actions';

import { KEYS } from '~/modules/contacts/__meta';

export function useDestroy(queryClient: QueryClient) {
    return useMutation({
        mutationFn: (options: DestroyOptions) => destroy(options),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: KEYS.lists()
            });
        },
        onError: (err) => {
            console.error("Error in destroy contact hook: ", err);
        }
    });
};