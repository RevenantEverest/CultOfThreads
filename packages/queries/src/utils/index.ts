import type { PaginatedResponse } from '~/types';

export function getNextPageParam<T>(lastPage: PaginatedResponse<T>) {
    if(!lastPage.next) return;

    const url = new URL(lastPage.next);
    const params = parseInt(url.searchParams.get("page") ?? "0") || undefined;

    return params;
};