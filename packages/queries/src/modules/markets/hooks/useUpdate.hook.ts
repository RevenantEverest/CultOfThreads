import { type QueryClient, useMutation } from '@tanstack/react-query';
import { type UpdateOptions, update } from '~/modules/markets/actions';

import { KEYS } from '~/modules/markets/__meta';

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
            console.error("Error in update market hook: ", err);
        }
    });
};