import type { Product } from '@repo/entities';

import { Link } from '@tanstack/react-router';
import {
    Button,
    TableCell,
    TableRow
} from '@repo/ui';
import { FaDollarSign, FaPencil } from 'react-icons/fa6';
import RemoveProduct from './RemoveProduct';
import StatusBadge from './StatusBadge';

import { URLS } from '@@admin/constants';

interface ProductsRowProps {
    product: Product
};

function ProductsRow({ product }: ProductsRowProps) {

    const cellClass = "py-4";

    return(
        <TableRow className="border-b-muted font-semibold">
            <TableCell className={`${cellClass}`}>
                <div className="w-24 h-24 flex overflow-hidden">
                    {
                        (product.media && product.media[0]) &&
                        <img 
                            className="shrink-0 relative object-cover w-full h-full rounded-lg"
                            src={`${URLS.SUPABASE_STORAGE}/${product.media[0].mediaUrl}`} 
                            alt={product.name}
                        />
                    }
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <Link to="/dashboard/products/item/$productId" params={{ productId: product.id.toString() }}>
                    <p className="hover:cursor-pointer hover:underline">{product.name}</p>
                </Link>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    {
                        product?.details?.status && 
                        <StatusBadge status={product.details.status as Product["details"]["status"]} />
                    }
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <FaDollarSign className="text-primary" />
                    <p>{product?.details?.onlinePrice ?? 0}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <FaDollarSign className="text-primary" />
                    <p>{product?.details?.marketPrice ?? 0}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="h-full w-full flex items-center justify-end gap-2">
                    <Link to={`/dashboard/products/edit/$productId`} params={{ productId: product.id.toString() }}>
                        <Button size="icon" className="relative">
                            <FaPencil />
                        </Button>
                    </Link>
                    <RemoveProduct product={product} />
                </div>
            </TableCell>
        </TableRow>
    );
};

export default ProductsRow;