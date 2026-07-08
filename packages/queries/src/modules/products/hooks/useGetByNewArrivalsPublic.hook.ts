import { type QueryClient, useQuery } from '@tanstack/react-query';
import { fetchByNewArrivalsPublic } from '~/modules/products/actions';

import { KEYS } from '~/modules/products/__meta';

export async function usePrefetchGetByNewArrivalsPublic(queryClient: QueryClient) {
    await queryClient.prefetchQuery({
        queryKey: KEYS.newArrivals(),
        queryFn: () => fetchByNewArrivalsPublic()
    });
};

export function useGetByNewArrivalsPublic() {
    return useQuery({
        queryKey: KEYS.newArrivals(),
        queryFn: () => fetchByNewArrivalsPublic()
    });
};