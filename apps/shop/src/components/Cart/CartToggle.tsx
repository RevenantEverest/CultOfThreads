import { FaShoppingCart } from 'react-icons/fa'

import { 
    MotionHover, 
    Tooltip, 
    TooltipContent, 
    TooltipProvider, 
    TooltipTrigger
} from '@repo/ui';
import { useCartStore } from '@@shop/store/cart';

function CartToggle() {

    const cart = useCartStore((state) => state);

    return(
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild onClick={() => cart.toggleCart()}>
                    <MotionHover 
                        className={`
                            relative w-6/12 flex items-center justify-center hover:cursor-pointer
                            bg-card-light rounded-full py-1.5 px-4
                            lg:bg-transparent lg:px-0 lg:py-0
                        `}
                    >
                        <div className="flex gap-2 items-center justify-center">
                            <FaShoppingCart className="text-lg" />
                            <p className="font-semibold block lg:hidden">Cart</p>
                        </div>
                        {
                            cart.cart.items.length > 0 &&
                            (
                                <div 
                                    className={`
                                        flex items-center justify-center bg-primary font-bold rounded-full text-xs
                                        h-5 w-5 lg:h-4 lg:w-4 absolute -right-2 lg:-right-3 -bottom-2
                                    `}
                                >
                                    <p>{cart.cart.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
                                </div>
                            )
                        }
                    </MotionHover>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Cart</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default CartToggle;