import { type QueryClient, useQuery } from '@tanstack/react-query';
import { type FetchByEventIdOptions, fetchByEventId } from '~/modules/sales/actions';

import { KEYS } from '~/modules/sales/__meta';

export async function usePrefetchGetByEventId(queryClient: QueryClient, options: FetchByEventIdOptions) {
    await queryClient.prefetchQuery({
        queryKey: KEYS.details(options.id),
        queryFn: () => fetchByEventId(options)
    });
};

export function useGetByEventId(options: FetchByEventIdOptions) {
    return useQuery({
        queryKey: KEYS.details(options.id),
        queryFn: () => fetchByEventId(options)
    });
};