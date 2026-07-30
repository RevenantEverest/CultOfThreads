import type { PaginatedResponse } from '~/types';
import { type QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { type FetchAllPublicOptions, fetchAllPublic } from '~/modules/products/actions';

import { KEYS } from '~/modules/products/__meta';
import { Product } from '@repo/entities';

import { pagination } from '~/utils';

interface Options extends FetchAllPublicOptions {
    filters?: Record<string, string>
};

const makeRequest = (pageParam: number, options: Options) => {
    const { limit=10 } = options.pagination;
    return fetchAllPublic({
        query: options.query,
        pagination: {
            page: pageParam,
            limit
        }
    });
};

export async function usePrefetchIndexPublic(
    queryClient: QueryClient, 
    options: Options
) {
    await queryClient.prefetchInfiniteQuery({
        queryKey: KEYS.lists(options.filters),
        queryFn: ({ pageParam }) => makeRequest(pageParam, options),
        initialPageParam: 1,
        getNextPageParam: (lastPage: PaginatedResponse<Product>) => {
            return pagination.getNextPageParam<Product>(lastPage);
        }
    });
};

export function useIndexPublic(options: Options) {
    return useInfiniteQuery({
        queryKey: KEYS.lists(options.filters),
        queryFn: ({ pageParam }) => makeRequest(pageParam, options),
        initialPageParam: 1,
        getNextPageParam: (lastPage: PaginatedResponse<Product>) => {
            return pagination.getNextPageParam<Product>(lastPage);
        }
    });
};