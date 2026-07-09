import type { Product } from '@repo/entities';

import { FaPlus, FaMinus } from 'react-icons/fa';
import { FaDollarSign } from 'react-icons/fa6';

import { Button, MotionHover } from '@repo/ui';
import { Image } from '@@shop/components/Common';

import { useCartStore } from '@@shop/store/cart';
import { URLS } from '@@shop/constants';

interface CartItemProps {
    productId: string,
    quantity: number,
    product?: Product
};

function CartItem({ productId, quantity, product }: CartItemProps) {

    const cart = useCartStore((state) => state);

    return(
        <div className="flex items-center gap-4">
            <div>
                <Image 
                    className="rounded-xl border-muted border-4 h-30 w-30"
                    height={100}
                    width={100}
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
                        <p>{((product?.details?.onlinePrice ?? 0) * quantity).toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex gap-5">
                    <p className="text-sm"><span className="font-semibold">Quantity:</span> {quantity.toLocaleString()}</p>
                    <div className="flex gap-1">
                        <MotionHover y={"-.3dvh"}>
                            <button 
                                className={`
                                    bg-accent h-5 w-5 text-center rounded-md flex items-center justify-center text-xs text-black
                                    hover:cursor-pointer disabled:bg-muted
                                `}
                                disabled={quantity <= 1}
                                onClick={() => cart.reduceItemQuantity(productId)}
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
                                onClick={() => cart.addItem({ productId, quantity: 1 })}
                            >
                                <FaPlus />
                            </button>
                        </MotionHover>
                    </div>
                </div>
                <div className="flex">
                    <Button className="" size="xs" onClick={() => cart.removeItem(productId)}>
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;