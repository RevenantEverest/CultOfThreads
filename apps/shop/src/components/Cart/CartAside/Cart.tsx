"use client"

import { FaTimesCircle } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';

import { useCartInvalidator } from '@@shop/hooks';
import { useCartStore } from '@@shop/store/cart';
import { 
    MotionHover, 
    Sheet, 
    SheetContent, 
    SheetHeader, 
    SheetTitle
} from '@repo/ui';

import CartMain from './CartMain';

function Cart() {

    useCartInvalidator();
    const cart = useCartStore((state) => state);

    return(
        <Sheet open={cart.isOpen} onOpenChange={() => cart.toggleCart()}>
            <SheetContent className="min-w-full lg:min-w-130 h-dvh border-muted">
                <SheetHeader className="flex flex-row items-center">
                    <SheetTitle className="flex items-center text-2xl font-semibold gap-4 text-text">
                        <FaCartShopping /> Cart <span className="text-muted">({cart.cart.items.reduce((acc, item) => acc + item.quantity, 0).toLocaleString()} items)</span>
                    </SheetTitle>
                    <div className="flex-1 flex justify-end">
                        <div onClick={() => cart.toggleCart()}>
                            <MotionHover>
                                <FaTimesCircle className="text-lg text-muted hover:cursor-pointer" />
                            </MotionHover>
                        </div>
                    </div>
                </SheetHeader>
                <CartMain />
            </SheetContent>
        </Sheet>
    );
};

export default Cart;