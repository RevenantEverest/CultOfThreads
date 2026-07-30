import { type QueryClient, useMutation } from '@tanstack/react-query';
import { type CreateOptions, create } from '~/modules/trafficAnalytics/actions';

import { KEYS } from '~/modules/trafficAnalytics/__meta';

export function useCreate(queryClient: QueryClient) {
    return useMutation({
        mutationFn: (options: CreateOptions) => create(options),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: KEYS.lists()
            });
        },
        onError: (err) => {
            console.error("Error in create traffic analytics hook: ", err);
        }
    })
};