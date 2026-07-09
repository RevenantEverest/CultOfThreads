"use client"

import type { Product } from '@repo/entities';

import { useQueryClient } from '@tanstack/react-query';

import { useCartStore } from '@@shop/store/cart';
import CartItem from './CartItem';

import { ApiResponse, products } from '@repo/queries';

function CartContents() {

    const cartItems = useCartStore((state) => state.cart.items);
    const productIds = cartItems.map((item) => item.productId);

    const queryClient = useQueryClient();
    const cartProducts = queryClient.getQueryData<ApiResponse<Product[]>>(
        products.PRODUCT_KEYS.cart(productIds)
    );

    const renderItems = () => {
        return cartItems.map((item, index) => {
            const product = cartProducts?.results.find((cProduct) => cProduct.id === item.productId);

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