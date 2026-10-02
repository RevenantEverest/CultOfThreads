import { type QueryClient, useQuery } from '@tanstack/react-query';
import { type FetchAggregatedTotalsOptions, fetchAggregatedTotals } from '~/modules/sales/actions';

import { KEYS } from '~/modules/sales/__meta';

export async function usePrefetchAggregatedTotals(queryClient: QueryClient, options: FetchAggregatedTotalsOptions) {
    await queryClient.prefetchQuery({
        queryKey: KEYS.aggregatedTotals(),
        queryFn: () => fetchAggregatedTotals(options)
    });
};

export function useAggregatedTotals(options: FetchAggregatedTotalsOptions) {
    return useQuery({
        queryKey: KEYS.aggregatedTotals(),
        queryFn: () => fetchAggregatedTotals(options)
    });
};