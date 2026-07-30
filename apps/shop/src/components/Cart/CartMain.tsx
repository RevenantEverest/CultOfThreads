import { BeatLoader } from 'react-spinners';

import EmptyCart from './EmptyCart';
import CartContents from './CartContents';

import { useCartStore } from '@@shop/store/cart';

import { useThemeStore } from '@@shop/store/theme';
import CartSummary from './CartSummary';
import { products } from '@repo/queries';

function CartMain() {

    const cartItems = useCartStore((state) => state.cart.items);
    const theme = useThemeStore((state) => state.theme);

    const productIds = cartItems.map((item) => item.productId);

    const query = products.hooks.useGetCartProductsPublic({
        payload: {
            productIds
        }
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
                    (cartItems.length <= 0 && !query.isLoading) ? 
                    <EmptyCart /> : 
                    renderCartContents()
                }
            </div>
            {
                (cartItems.length > 0 && !query.isLoading) &&
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