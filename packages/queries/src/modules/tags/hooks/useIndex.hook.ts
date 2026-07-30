import type { PaginatedResponse } from '~/types';
import { type QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { type FetchAllOptions, fetchAll } from '~/modules/tags/actions';

import { KEYS } from '~/modules/tags/__meta';
import { Tag } from '@repo/entities';

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
        getNextPageParam: (lastPage: PaginatedResponse<Tag>) => {
            return pagination.getNextPageParam<Tag>(lastPage);
        }
    });
};

export function useIndex(options: FetchAllOptions) {
    return useInfiniteQuery({
        queryKey: KEYS.lists(),
        queryFn: ({ pageParam }) => makeRequest(pageParam, options),
        initialPageParam: 1,
        getNextPageParam: (lastPage: PaginatedResponse<Tag>) => {
            return pagination.getNextPageParam<Tag>(lastPage);
        }
    });
};