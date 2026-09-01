import { ENV } from '~/constants';

export interface CartItems {
    productId: string,
    quantity: number
};

export const BASE_URL = `${ENV.API_URL}/checkout`;
export const KEYS = {
    all: ["checkout"],
    session: (cartItems: CartItems[]) => [...KEYS.all, "session", cartItems]
};