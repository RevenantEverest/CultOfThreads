import { ENV } from '~/constants';

export interface InternalShippingOption {
    id: string,
    name: "STANDARD" | "EXPRESS",
};

export const STANDARD: InternalShippingOption = {
    id: ENV.STRIPE_SHIPPING_ID_STANDARD,
    name: "STANDARD"
};

export const EXPRESS: InternalShippingOption = {
    id: ENV.STRIPE_SHIPPING_ID_EXPRESS,
    name: "EXPRESS"
};