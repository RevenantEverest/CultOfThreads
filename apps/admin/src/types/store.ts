export interface ApiState<T> {
    data?: T,
    loading?: boolean,
    success?: boolean,
    error?: boolean
};