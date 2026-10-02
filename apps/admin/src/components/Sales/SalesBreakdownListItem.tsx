import type { Sale } from '@repo/entities';

import { FaClipboard, FaDollarSign } from 'react-icons/fa6';

import {
    TableCell,
    TableRow
} from '@repo/ui';

interface SalesBreakdownListItemProps {
    productName: string,
    sales: Sale[]
};

function SalesBreakdownListItem({ productName, sales }: SalesBreakdownListItemProps) {

    const cellClass = "py-4";

    return(
        <TableRow className="border-b-muted font-semibold">
            <TableCell className={`${cellClass}`}>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                    <p>{productName}</p>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <FaClipboard className="text-primary" />
                    <p className="font-bold">{(sales.length ?? 0).toLocaleString()}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <FaDollarSign className="text-primary" />
                    <p className="font-bold">{sales.reduce((acc, item) => acc + item.salePrice, 0).toLocaleString()}</p>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default SalesBreakdownListItem;