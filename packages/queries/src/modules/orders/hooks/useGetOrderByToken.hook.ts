import { type QueryClient, useQuery } from '@tanstack/react-query';
import { type FetchOrderByTokenOptions, fetchOrderByToken } from '~/modules/orders/actions';

import { KEYS } from '~/modules/orders/__meta';

const MAX_RETRIES = 3;

function shouldRetry(failureCount: number, error: unknown) {
    const status = (error as { status?: number })?.status;

    if(status === 410) return false;

    return failureCount < MAX_RETRIES;
};

export async function usePrefetchGetOrderByToken(queryClient: QueryClient, options: FetchOrderByTokenOptions) {
    await queryClient.prefetchQuery({
        queryKey: KEYS.customerView(),
        queryFn: () => fetchOrderByToken(options)
    });
};

export function useGetOrderByToken(options: FetchOrderByTokenOptions) {
    return useQuery({
        queryKey: KEYS.customerView(),
        queryFn: () => fetchOrderByToken(options),
        retry: shouldRetry
    });
};