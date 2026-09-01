"use client"

import type { Product } from '@repo/entities';
import type { CartItem } from '@@shop/store/cart';

import { FaPlus, FaMinus } from 'react-icons/fa';
import { FaDollarSign } from 'react-icons/fa6';
import { MotionHover, Button } from '@repo/ui';

import { Image } from '@@shop/components/Common';
import { useCartStore } from '@@shop/store/cart';

import { URLS } from '@@shop/constants';

interface CheckoutItemProps {
    product: Product,
    cartItem: CartItem
};

function CheckoutItem({ product, cartItem }: CheckoutItemProps) {

    const cart = useCartStore((state) => state);

    return(
        <div className="flex gap-5 items-center py-5">
            <div>
                <Image 
                    className="rounded-xl border-muted border-4 h-50 w-50"
                    height={400}
                    width={400}
                    loading="eager"
                    src={URLS.SUPABASE_STORAGE + (product?.media && product.media[0]?.mediaUrl)} 
                    alt={`featured`}
                />
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                    <p className="font-bold">{product?.name}</p>
                    <div className="flex items-center">
                        <FaDollarSign className="text-primary mt-0.5" />
                        <p>{((product?.details?.onlinePrice ?? 0) * cartItem.quantity).toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex gap-5">
                    <p className="text-sm"><span className="font-semibold">Quantity:</span> {cartItem.quantity.toLocaleString()}</p>
                    <div className="flex gap-1">
                        <MotionHover y={"-.3dvh"}>
                            <button 
                                className={`
                                    bg-accent h-5 w-5 text-center rounded-md flex items-center justify-center text-xs text-black
                                    hover:cursor-pointer disabled:bg-muted
                                `}
                                disabled={cartItem.quantity <= 1}
                                onClick={() => cart.reduceItemQuantity(product.id)}
                            >
                                <FaMinus />
                            </button>
                        </MotionHover>
                        <MotionHover y={"-.3dvh"}>
                            <button 
                                className={`
                                    bg-accent h-5 w-5 text-center rounded-md flex items-center justify-center text-xs text-black
                                    hover:cursor-pointer
                                `}
                                onClick={() => cart.addItem({ productId: product.id, quantity: 1 })}
                            >
                                <FaPlus />
                            </button>
                        </MotionHover>
                    </div>
                </div>
                <div className="flex">
                    <Button className="" size="xs" onClick={() => cart.removeItem(product.id)}>
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutItem;