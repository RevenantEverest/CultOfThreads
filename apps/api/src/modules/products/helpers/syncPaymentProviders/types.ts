import type { ProductProviderDetails } from '@repo/entities';

type ActionType = "create" | "update" | "destroy";
type Providers = "STRIPE" | "SQUARE";

export interface ProviderDetails {
    stripeProductId: ProductProviderDetails["stripePriceId"],
    stripePriceId: ProductProviderDetails["stripePriceId"],
    squareProductId: ProductProviderDetails["squareProductId"]
};

export interface SyncPaymentProviderOptions {
    actionType: ActionType,
    providerTargets?: Providers[],
    hasOnlinePriceChange?: boolean,
    hasMarketPriceChange?: boolean
};