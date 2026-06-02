export type PaginationUrl = string | null;
export interface PaginatedResponse<T> {
    count: number,
    next: PaginationUrl,
    previous: PaginationUrl,
    results: T[]
};

export interface ApiResponse<T> {
    results: T
};

export interface PaginationOptions {
    page?: number,
    limit?: number
};


interface Options<T = unknown> {
    pagination: PaginationOptions,
    authToken: string,
    payload: T
};

export type HookOptions<K extends keyof Options<unknown>, T = unknown> = Pick<Options<T>, K>;