import { BeatLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';

import EmptyCart from './EmptyCart';
import CartContents from './CartContents';

import { useCartStore } from '@@shop/store/cart';

import { QUERY_KEYS } from '@@shop/constants';
import { productApi } from '@repo/supabase';
import { useThemeStore } from '@@shop/store/theme';
import CartSummary from './CartSummary';

function CartMain() {

    const cart = useCartStore((state) => state);
    const theme = useThemeStore((state) => state.theme);

    const productIds = cart.cart.items.map((item) => item.productId);

    const query = useQuery({
        queryKey: [QUERY_KEYS.CART_PRODUCTS],
        queryFn: () => productApi.fetchCartProducts(productIds),
        enabled: productIds.length > 0,
    });

    const renderCartContents = () => {
        if(query.isLoading || !query.data) {
            return(
                <BeatLoader
                    className="flex flex-1 items-center justify-center mt-10"
                    size={15}
                    color={theme.colors.primary}
                />
            );
        }

        return <CartContents />
    };

    return(
        <div>
            <div className="px-5 h-[80dvh]">
                {
                    (cart.cart.items.length <= 0 && !query.isLoading) ? 
                    <EmptyCart /> : 
                    renderCartContents()
                }
            </div>
            {
                (cart.cart.items.length > 0 && !query.isLoading) &&
                (
                    <div className=" absolute bottom-5 left-0 px-5 w-full">
                        <CartSummary />
                    </div>
                )
            }
        </div>
    );
};

export default CartMain;