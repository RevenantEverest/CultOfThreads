import type { Product } from '@repo/entities';
import { useCartStore, type CartItem } from '@@shop/store/cart';

import { FaDollarSign, FaMinus, FaPlus } from 'react-icons/fa6';
import { TableCell, TableRow, MotionHover, Button } from '@repo/ui';
import { Image } from '@@shop/components/Common';
import { URLS } from '@@shop/constants';

interface CartTableRowProps {
    product: Product,
    cartItem: CartItem
};

export default function CartTableRow({ product, cartItem }: CartTableRowProps) {

    const cart = useCartStore((state) => state);

    const cellClass = "py-4";

    return(
        <TableRow className="border-b-muted font-semibold">
            <TableCell className={`${cellClass} flex items-center gap-3`}>
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
                    <p className="font-bold">{product?.name}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
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
                        <p>{cartItem.quantity.toLocaleString()}</p>
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
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <FaDollarSign className="text-primary" />
                    <p>{product.details.onlinePrice.toLocaleString()}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <FaDollarSign className="text-primary" />
                    <p>{(product.details.onlinePrice * cartItem.quantity).toLocaleString()}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-end">
                    <Button className="" size="xs" onClick={() => cart.removeItem(product.id)}>
                        Remove
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
};