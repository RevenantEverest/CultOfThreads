import type { PaginatedResponse } from '~/types';
import { type QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { type FetchAllOptions, fetchAll } from '~/modules/trafficAnalytics/actions';

import { KEYS } from '~/modules/trafficAnalytics/__meta';
import { TrafficAnalytics } from '@repo/entities';

import { pagination } from '~/utils';

const makeRequest = (pageParam: number, options: FetchAllOptions) => {
    const { limit=10 } = options.pagination;
    return fetchAll({
        authToken: options.authToken,
        pagination: {
            page: pageParam,
            limit
        }
    });
};

export async function usePrefetchIndex(queryClient: QueryClient, options: FetchAllOptions) {
    await queryClient.prefetchInfiniteQuery({
        queryKey: KEYS.lists(),
        queryFn: ({ pageParam }) => makeRequest(pageParam, options),
        initialPageParam: 1,
        getNextPageParam: (lastPage: PaginatedResponse<TrafficAnalytics>) => {
            return pagination.getNextPageParam<TrafficAnalytics>(lastPage);
        }
    });
};

export function useIndex(options: FetchAllOptions) {
    return useInfiniteQuery({
        queryKey: KEYS.lists(),
        queryFn: ({ pageParam }) => makeRequest(pageParam, options),
        initialPageParam: 1,
        getNextPageParam: (lastPage: PaginatedResponse<TrafficAnalytics>) => {
            return pagination.getNextPageParam<TrafficAnalytics>(lastPage);
        }
    });
};