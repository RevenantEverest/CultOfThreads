import type { OrderLineItem as OrderLineItemType } from '@repo/entities';

import { Link } from '@tanstack/react-router';
import { FaDollarSign, FaXmark } from 'react-icons/fa6';
import { TableRow, TableCell } from '@repo/ui';

interface OrderLineItemProps {
    index: number,
    lineItem: OrderLineItemType
};

function OrderLineItem({ lineItem }: OrderLineItemProps) {

    const cellClass = "py-4";

    return(
        <TableRow className="border-b-muted font-semibold">
            <TableCell className={`${cellClass}`}>
                {/* <div className="w-24 h-24 flex overflow-hidden">
                {
                    event.market.details?.logo_url &&
                    <img 
                        className="shrink-0 relative object-cover w-full h-full rounded-lg"
                        src={`${URLS.SUPABASE_STORAGE}/${event.flyer_url}`} 
                        alt={event.market.name}
                    />
                }
                </div> */}
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <Link to="/dashboard/products/item/$productId" params={{ productId: lineItem.product.id }}>
                    <p className="hover:cursor-pointer hover:underline">{lineItem.product.name}</p>
                </Link>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center text-accent font-bold">
                    <FaXmark className="text-primary" />
                    <p>{lineItem.quantity.toLocaleString()}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center justify-center gap-2">
                    <div className="flex items-center gap-1 justify-center">
                        <FaDollarSign className="text-primary" />
                        <p>{lineItem.purchasePriceSnapshot.toLocaleString()}</p>
                    </div>
                    {
                        lineItem.quantity > 1 && 
                        <div className="flex items-center justify-center text-muted">
                            {"("}
                                <FaDollarSign />
                                <p>{(lineItem.purchasePriceSnapshot / lineItem.quantity).toLocaleString()} /each</p>
                            {")"}
                        </div>
                    }
                </div>
            </TableCell>
        </TableRow>
    );
};

export default OrderLineItem;