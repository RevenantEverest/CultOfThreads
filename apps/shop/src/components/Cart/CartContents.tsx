"use client"

import type { ProductWithDetailsAndMedia } from '@repo/supabase';

import { useQueryClient } from '@tanstack/react-query';

import { useCartStore } from '@@shop/store/cart';
import CartItem from './CartItem';

import { QUERY_KEYS } from '@@shop/constants';

function CartContents() {

    const cartItems = useCartStore((state) => state.cart.items);

    const queryClient = useQueryClient();
    const cartProducts = queryClient.getQueryData<ProductWithDetailsAndMedia[]>([QUERY_KEYS.CART_PRODUCTS]);

    const renderItems = () => {
        return cartItems.map((item, index) => {
            const product = cartProducts?.find((cProduct) => cProduct.id === item.productId);

            return(
                <CartItem 
                    key={`cart-item-${item.productId}-${index}`}
                    productId={item.productId}
                    quantity={item.quantity}
                    product={product}
                />
            );
            
        });
    };

    return(
        <div className="flex flex-1 flex-col gap-10 overflow-scroll max-h-[67dvh]!">
            {renderItems()}
        </div>
    );
};

export default CartContents;