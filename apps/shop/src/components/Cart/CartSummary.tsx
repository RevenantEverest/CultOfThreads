import { FaLongArrowAltRight } from 'react-icons/fa';

import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
    Button
} from '@repo/ui';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@@shop/constants';
import { useCartStore } from '@@shop/store/cart';
import { ProductWithDetailsAndMedia } from '@repo/supabase';
import { FaDollarSign } from 'react-icons/fa6';

function CartSummary() {

    const cartItems = useCartStore((state) => state.cart.items);
    const queryClient = useQueryClient();
    const cartProducts = queryClient.getQueryData<ProductWithDetailsAndMedia[]>([QUERY_KEYS.CART_PRODUCTS]);

    const getSubtotal = () => {
        let subtotal = 0;

        for(let i = 0; i < cartItems.length; i++) {
            const current = cartItems[i];
            const product = cartProducts?.find((item) => item.id === current?.productId);

            subtotal += ((product?.details?.online_price ?? 0) * (current?.quantity ?? 0));
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
                <Button>
                    Proceed to checkout <FaLongArrowAltRight />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CartSummary;