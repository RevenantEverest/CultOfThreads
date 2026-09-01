"use client"

import type { Product } from '@repo/entities';
import type { ApiResponse } from '@repo/queries';

import { useQueryClient } from '@tanstack/react-query';

import { useCartInvalidator } from '@@shop/hooks';
import { useCartStore } from '@@shop/store/cart';

import { CheckoutItemList } from '@@shop/components/Checkout';

import { products } from '@repo/queries';

function CheckoutContainer() {

    useCartInvalidator();
    const cartItems = useCartStore((state) => state.cart.items);
    const productIds = cartItems.map((item) => item.productId);

    const queryClient = useQueryClient();
    const query = queryClient.getQueryData<ApiResponse<Product[]>>(
        products.PRODUCT_KEYS.cart(productIds)
    );

    return(
        <div className="w-full">
            <CheckoutItemList products={query?.results} isLoading={!query?.results} />
        </div>
    );
};

export default CheckoutContainer;