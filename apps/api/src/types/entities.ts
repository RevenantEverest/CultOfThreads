import type { FindManyOptions } from 'typeorm';

export interface IndexOptions extends FindManyOptions {
    offset?: number,
    limit?: number,
    count?: boolean,
    withoutPagination?: boolean
};