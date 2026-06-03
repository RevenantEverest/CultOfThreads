import { type QueryClient, useMutation } from '@tanstack/react-query';
import { type UpdateOptions, update } from '~/modules/contacts/actions';

import { KEYS } from '~/modules/contacts/__meta';

export function useUpdate(queryClient: QueryClient) {
    return useMutation({
        mutationFn: (options: UpdateOptions) => update(options),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: KEYS.lists()
            });
        },
        onError: (err) => {
            console.error("Error in update contact hook: ", err);
        }
    });
};