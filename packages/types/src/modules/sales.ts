export interface SalesAggregateResponse {
    revenue: {
        total: number,
        event: number,
        online: number,
        uncategorized: number
    }
};