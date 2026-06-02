import type { FindManyOptions } from 'typeorm';

export interface IndexOptions<T> extends FindManyOptions<T> {
    offset?: number,
    limit?: number,
    count?: boolean,
    withoutPagination?: boolean
};