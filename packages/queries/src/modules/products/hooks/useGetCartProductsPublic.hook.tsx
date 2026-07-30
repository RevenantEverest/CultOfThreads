import { useQuery } from '@tanstack/react-query';
import { type FetchCartProductsPublicOptions, fetchCartProductsPublic } from '~/modules/products/actions';

import { KEYS } from '~/modules/products/__meta';

export function useGetCartProductsPublic(options: FetchCartProductsPublicOptions) {
    return useQuery({
        queryKey: KEYS.cart(options.payload.productIds),
        queryFn: () => fetchCartProductsPublic(options),
        enabled: options.payload.productIds.length > 0
    });
};