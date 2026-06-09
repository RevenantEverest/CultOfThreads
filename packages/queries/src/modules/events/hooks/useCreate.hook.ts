import { type QueryClient, useMutation } from '@tanstack/react-query';
import { type CreateOptions, create } from '~/modules/events/actions';

import { KEYS } from '~/modules/events/__meta';

export function useCreate(queryClient: QueryClient) {
    return useMutation({
        mutationFn: (options: CreateOptions) => create(options),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: KEYS.lists()
            });
        },
        onError: (err) => {
            console.error("Error in create event hook: ", err);
        }
    })
};