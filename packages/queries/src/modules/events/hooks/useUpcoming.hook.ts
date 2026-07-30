import { type QueryClient, useQuery } from '@tanstack/react-query';
import { fetchUpcoming } from '~/modules/events/actions';

import { KEYS } from '~/modules/events/__meta';

export async function usePrefetchUpcoming(queryClient: QueryClient) {
    await queryClient.prefetchQuery({
        queryKey: KEYS.upcoming(),
        queryFn: () => fetchUpcoming()
    });
};

export function useUpcoming() {
    return useQuery({
        queryKey: KEYS.upcoming(),
        queryFn: () => fetchUpcoming()
    });
};