import { type QueryClient, useQuery } from '@tanstack/react-query';
import { type FetchByIdPublicOptions, fetchByIdPublic } from '~/modules/products/actions';

import { KEYS } from '~/modules/products/__meta';

export async function useFetchGetOnePublic(
    queryClient: QueryClient,
    options: FetchByIdPublicOptions
) {
    return queryClient.fetchQuery({
        queryKey: KEYS.details(options.id),
        queryFn: () => fetchByIdPublic(options)
    });
};

export async function usePrefetchGetOnePublic(
    queryClient: QueryClient, 
    options: FetchByIdPublicOptions
) {
    await queryClient.prefetchQuery({
        queryKey: KEYS.details(options.id),
        queryFn: () => fetchByIdPublic(options)
    });
};

export function useGetOnePublic(options: FetchByIdPublicOptions) {
    return useQuery({
        queryKey: KEYS.details(options.id),
        queryFn: () => fetchByIdPublic(options)
    });
};