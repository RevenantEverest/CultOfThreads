import { type QueryClient, useQuery } from '@tanstack/react-query';
import { type FetchByIdOptions, fetchById } from '~/modules/events/actions';

import { KEYS } from '~/modules/events/__meta';

export async function usePrefetchGetOne(queryClient: QueryClient, options: FetchByIdOptions) {
    await queryClient.prefetchQuery({
        queryKey: KEYS.details(options.id),
        queryFn: () => fetchById(options)
    });
};

export function useGetOne(options: FetchByIdOptions) {
    return useQuery({
        queryKey: KEYS.details(options.id),
        queryFn: () => fetchById(options)
    });
};