import { type QueryClient, useQuery } from '@tanstack/react-query';
import { fetchByBestSellersPublic } from '~/modules/products/actions';

import { KEYS } from '~/modules/products/__meta';

export async function usePrefetchGetByBestSellersPublic(queryClient: QueryClient) {
    await queryClient.prefetchQuery({
        queryKey: KEYS.bestSellers(),
        queryFn: () => fetchByBestSellersPublic()
    });
};

export function useGetByBestSellersPublic() {
    return useQuery({
        queryKey: KEYS.bestSellers(),
        queryFn: () => fetchByBestSellersPublic()
    });
};