type Truthy<T> = T extends false | "" | 0 | null | undefined ? never : T;

export function RNG(num: number) {
    return Math.floor(Math.random() * num);
};

export function isTruthy<T>(value: T): value is Truthy<T> {
    return !!value;
};