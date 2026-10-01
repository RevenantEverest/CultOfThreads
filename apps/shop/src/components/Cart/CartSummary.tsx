import type { Product } from '@repo/entities';
import { Card, CardContent } from '@repo/ui';
import { CheckoutButton } from '@@shop/components/Checkout';
import { FaDollarSign } from 'react-icons/fa6';
import { useCartStore } from '@@shop/store/cart';
import CustomerNote from './CustomerNote';

interface CartSummaryProps {
    products?: Product[],
    isLoading?: boolean
};

function CartSummary({ products, isLoading }: CartSummaryProps) {

    const cartItems = useCartStore((state) => state.cart.items);
    const getTotalCartQuantities = useCartStore((state) => state.getTotalQuantities);

    const renderSubtotal = () => {
        if(!products) {
            return;
        }

        let subtotal = 0;
        for(let i = 0; i < cartItems.length; i++) {
            const current = cartItems[i];

            if(current) {
                const product = products.find((item) => item.id === current.productId);
                const price = product?.details.onlinePrice ?? 0;

                subtotal += (price * current.quantity);
            }
        }

        return(
            <div className="flex items-center">
                <FaDollarSign className="text-primary" />
                <p>{subtotal.toLocaleString()}</p>
            </div>
        );
    };

    return(
        <Card className="h-full">
            <CardContent className="pt-10 flex flex-col gap-10 h-full">
                <div className="flex flex-col gap-5 flex-1">
                    <p className="font-bold text-xl">Order Summary</p>
                    <div className="flex">
                        <p className="text-md items-center flex font-semibold text-muted flex-1">Items ({getTotalCartQuantities().toLocaleString()})</p>
                        {!isLoading && renderSubtotal()}
                    </div>
                </div>
                <div className="w-full flex flex-col gap-5">
                    <p className="text-muted font-semibold">Taxes will be calculated at checkout</p>
                    <CustomerNote />
                    <CheckoutButton className="w-full" />
                </div>
            </CardContent>
        </Card>
    );
};

export default CartSummary;