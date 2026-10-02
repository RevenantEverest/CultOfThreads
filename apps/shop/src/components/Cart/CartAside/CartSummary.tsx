"use client"

import type { Product } from '@repo/entities';

import { useRouter } from 'next/navigation';
import { FaDollarSign } from 'react-icons/fa6';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';

import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
    Button
} from '@repo/ui';
import { useCartStore } from '@@shop/store/cart';
import { ApiResponse, products } from '@repo/queries';

function CartSummary() {

    const cart = useCartStore((state) => state);
    const cartItems = cart.cart.items;
    const productIds = cartItems.map((item) => item.productId);

    const router = useRouter();
    
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
            <CardFooter className="flex gap-5">
                <Button onClick={() => {
                    cart.toggleCart();
                    router.push("/shop/cart");
                }}>
                    View Full Cart <FaLongArrowAltRight />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CartSummary;