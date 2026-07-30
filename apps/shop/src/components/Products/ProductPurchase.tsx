"use client"

import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

import { Button, MotionHover, ToastSuccess } from '@repo/ui';
import { useCartStore } from '@@shop/store/cart';
import toast from 'react-hot-toast';

interface ProductPurchaseProps {
    productId: string
};

function ProductPurchase({ productId }: ProductPurchaseProps) {

    const cart = useCartStore((state) => state);
    const [quantity, setQuantity] = useState(1);

    const increaseAmount = () => {
        const updatedQuantity = quantity + 1;
        setQuantity(updatedQuantity);
    };

    const decreaseAmount = () => {
        const updatedQuantity = quantity - 1;
        setQuantity(updatedQuantity < 1 ? 1 : updatedQuantity);
    };

    return(
        <div className="flex gap-5 items-center">
            <div className="flex gap-3">
                <MotionHover>
                    <button 
                        className={`
                            bg-primary h-7 w-7 text-center rounded-md flex items-center justify-center text-sm 
                            hover:cursor-pointer
                        `}
                        onClick={decreaseAmount}
                    >
                        <FaMinus />
                    </button>
                </MotionHover>
                <p className="font-semibold text-lg">{quantity}</p>
                <MotionHover>
                    <button 
                        className={`
                            bg-primary h-7 w-7 text-center rounded-md flex items-center justify-center text-sm 
                            hover:cursor-pointer
                        `}
                        onClick={increaseAmount}
                    >
                        <FaPlus />
                    </button>
                </MotionHover>
            </div>
            <div>
                <Button 
                    size="md" 
                    onClick={() => {
                        cart.addItem({ productId, quantity });
                        cart.toggleCart();
                        toast((t) => (
                            <ToastSuccess toast={t} message={`${quantity > 1 ? "Products" : "Product"} added to cart!`} />
                        ));
                    }}
                >
                    Add to cart
                </Button>
            </div>
        </div>
    );
};

export default ProductPurchase;