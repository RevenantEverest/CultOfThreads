"use client"

import { useCartInvalidator } from '@@shop/hooks';
import { useCartStore } from '@@shop/store/cart';

import { CartTable, CartSummary } from '@@shop/components/Cart';

import { products } from '@repo/queries';

function CartContainer() {

    useCartInvalidator();
    const cartItems = useCartStore((state) => state.cart.items);
    const productIds = cartItems.map((item) => item.productId);

    const query = products.hooks.useGetCartProductsPublic({
        payload: {
            productIds
        }
    });

    return(
        <div className="w-full flex gap-5">
            <div className="w-8/12">
                <CartTable products={query.data?.results} isLoading={query.isLoading} />
            </div>
            <div className="w-4/12">
            <CartSummary products={query.data?.results} isLoading={query.isLoading} />
            </div>
        </div>
    );
};

export default CartContainer;