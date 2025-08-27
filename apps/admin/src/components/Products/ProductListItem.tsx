import type { ProductWithDetails, ProductDetailsStatus } from '@repo/supabase';

import { Link } from '@tanstack/react-router';
import {
    Button,
    TableCell,
    TableRow
} from '@repo/ui';
import { FaDollarSign, FaPencil } from 'react-icons/fa6';
import RemoveProduct from './RemoveProduct';
import StatusBadge from './StatusBadge';

interface ProductListItemProps {
    product: ProductWithDetails
};

function ProductListItem({ product }: ProductListItemProps) {

    const cellClass = "py-4";

    return(
        <TableRow className="border-b-muted font-semibold">
            <TableCell className={`${cellClass}`}></TableCell>
            <TableCell className={`${cellClass}`}>
                <Link to="/dashboard/products/edit/$productId" params={{ productId: product.id.toString() }}>
                    <p className="hover:cursor-pointer hover:underline">{product.name}</p>
                </Link>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    {
                        product?.details?.status && 
                        <StatusBadge status={product.details.status as ProductDetailsStatus} />
                    }
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <FaDollarSign className="text-primary" />
                    <p>{product?.details?.online_price ?? 0}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <FaDollarSign className="text-primary" />
                    <p>{product?.details?.market_price ?? 0}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass} text-right flex items-end justify-end gap-2`}>
                <Link to={`/dashboard/products/edit/$productId`} params={{ productId: product.id.toString() }}>
                    <Button size="icon" className="relative">
                        <FaPencil />
                    </Button>
                </Link>
                <RemoveProduct product={product} />
            </TableCell>
        </TableRow>
    );
};

export default ProductListItem;