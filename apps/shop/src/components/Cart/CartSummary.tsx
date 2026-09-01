"use client"

import type { Product } from '@repo/entities';

import { FaDollarSign } from 'react-icons/fa6';
import { useQueryClient } from '@tanstack/react-query';

import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter
} from '@repo/ui';
import { useCartStore } from '@@shop/store/cart';
import { ApiResponse, products } from '@repo/queries';
import CheckoutButton from './CheckoutButton';

function CartSummary() {

    const cart = useCartStore((state) => state);
    const cartItems = cart.cart.items;
    const productIds = cartItems.map((item) => item.productId);
    
    const queryClient = useQueryClient();
    const cartProducts = queryClient.getQueryData<ApiResponse<Product[]>>(
        products.PRODUCT_KEYS.cart(productIds)
    );

    const getSubtotal = () => {
        let subtotal = 0;

        for(let i = 0; i < cartItems.length; i++) {
            const current = cartItems[i];
            const product = cartProducts?.results.find((item) => item.id === current?.productId);

            subtotal += ((product?.details?.onlinePrice ?? 0) * (current?.quantity ?? 0));
        }

        return subtotal;
    };

    return(
        <Card>
            <CardHeader>
                <CardTitle>
                    <h1 className="font-bold text-xl">Totals</h1>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <div className="flex gap-5">
                    <p className="font-semibold">SubTotal: </p>
                    <div className="flex items-center">
                        <FaDollarSign className="text-primary mt-0.5" />
                        <p>{getSubtotal().toLocaleString()}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <CheckoutButton />
            </CardFooter>
        </Card>
    );
};

export default CartSummary;