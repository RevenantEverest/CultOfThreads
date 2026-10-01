import type { OrderLineItem } from '@repo/entities';

import { FaDollarSign } from 'react-icons/fa6';
import { TableCell, TableRow } from '@repo/ui';
import { Image } from '@@shop/components/Common';
import { URLS } from '@@shop/constants';

interface OrderDetailsRowProps {
    lineItem: OrderLineItem
};

export default function OrderDetailsRow({ lineItem }: OrderDetailsRowProps) {

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
                        src={URLS.SUPABASE_STORAGE + (lineItem.product.media && lineItem.product.media[0]?.mediaUrl)} 
                        alt={`featured`}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <p className="font-bold">{lineItem.product.name}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex gap-1 items-center justify-center">
                    <p>{lineItem.quantity.toLocaleString()}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <FaDollarSign className="text-primary" />
                    <p>{lineItem.purchasePriceSnapshot.toLocaleString()}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <FaDollarSign className="text-primary" />
                    <p>{(lineItem.purchasePriceSnapshot * lineItem.quantity).toLocaleString()}</p>
                </div>
            </TableCell>
        </TableRow>
    );
};