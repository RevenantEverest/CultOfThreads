import type { Order } from '@repo/entities';

import { Link } from '@tanstack/react-router';
import {
    Button,
    TableCell,
    TableRow
} from '@repo/ui';
import { FaDollarSign, FaPencil } from 'react-icons/fa6';
import OrderStatusBadge from './OrderStatusBadge';
// import RemoveProduct from './RemoveProduct';
// import StatusBadge from './StatusBadge';

interface OrdersRowProps {
    order: Order
};

function OrdersRow({ order }: OrdersRowProps) {

    const cellClass = "py-4";

    return(
        <TableRow className="border-b-muted font-semibold">
            <TableCell className={`${cellClass}`}>
                <div className="w-24 h-24 flex overflow-hidden">
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <Link to="/dashboard/orders/item/$orderId" params={{ orderId: order.id.toString() }}>
                    <p className="hover:cursor-pointer hover:underline">{order.id}</p>
                </Link>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <OrderStatusBadge status={order.status} />
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                
                <div className="flex items-center gap-1 justify-center">
                    <p>{order?.customerName}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <FaDollarSign className="text-primary" />
                    <p>{((order.amountTotalInCents ?? 0) / 100).toLocaleString()}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="h-full w-full flex items-center justify-end gap-2">
                    {/* <Link to={`/dashboard/orders/edit/$orderId`} params={{ orderId: order.id.toString() }}> */}
                        <Button size="icon" className="relative">
                            <FaPencil />
                        </Button>
                    {/* </Link> */}
                    {/* <RemoveProduct product={product} /> */}
                </div>
            </TableCell>
        </TableRow>
    );
};

export default OrdersRow;