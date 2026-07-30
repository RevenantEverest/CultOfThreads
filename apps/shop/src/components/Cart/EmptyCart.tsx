"use client"

import { FaLongArrowAltRight } from 'react-icons/fa';

import { Button } from '@repo/ui';

import { useCartStore } from '@@shop/store/cart';

function EmptyCart() {

    const toggleCart = useCartStore((state) => state.toggleCart);

    return(
        <div className="flex flex-col gap-5 h-full mt-10">
            <p>Looks like you have nothing in your cart, let&apos;s get you started!</p>
            <Button className="flex gap-4" onClick={() => toggleCart()}>
                Go Back To Shopping
                <FaLongArrowAltRight />
            </Button>
        </div>
    );
};

export default EmptyCart;