import type { PaginatedResponse } from '~/types';
import { type QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { type FetchAllPublicOptions, fetchAllPublic } from '~/modules/events/actions';

import { KEYS } from '~/modules/events/__meta';
import { Event } from '@repo/entities';

import { pagination } from '~/utils';

const makeRequest = (pageParam: number, options: FetchAllPublicOptions) => {
    const { limit=10 } = options.pagination;
    return fetchAllPublic({
        pagination: {
            page: pageParam,
            limit
        }
    });
};

export async function usePrefetchIndexPublic(queryClient: QueryClient, options: FetchAllPublicOptions) {
    await queryClient.prefetchInfiniteQuery({
        queryKey: KEYS.lists(),
        queryFn: ({ pageParam }) => makeRequest(pageParam, options),
        initialPageParam: 1,
        getNextPageParam: (lastPage: PaginatedResponse<Event>) => {
            return pagination.getNextPageParam<Event>(lastPage);
        }
    });
};

export function useIndexPublic(options: FetchAllPublicOptions) {
    return useInfiniteQuery({
        queryKey: KEYS.lists(),
        queryFn: ({ pageParam }) => makeRequest(pageParam, options),
        initialPageParam: 1,
        getNextPageParam: (lastPage: PaginatedResponse<Event>) => {
            return pagination.getNextPageParam<Event>(lastPage);
        }
    });
};