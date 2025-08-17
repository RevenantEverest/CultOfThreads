import type { MarketWithDetails } from '@@admin/api/markets';

import { Link } from '@tanstack/react-router';
import { FaPencil } from 'react-icons/fa6';
import {
    Button,
    TableCell,
    TableRow
} from '@repo/ui';
import RemoveMarket from './RemoveMarket';

import { URLS } from '@@admin/constants';

interface MarketListItemProps {
    market: MarketWithDetails
};

function MarketListItem({ market }: MarketListItemProps) {

    const cellClass = "py-4";

    return(
        <TableRow className="border-b-muted font-semibold">
            <TableCell className={`${cellClass}`}>
                {
                    market.market_details?.logo_url &&
                    <img 
                        className="w-18 rounded-lg"
                        src={`${URLS.supabaseStorageUrl}/${market.market_details.logo_url}`} 
                        alt={market.name}
                    />
                }
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <Link to="/dashboard/markets/edit/$marketId" params={{ marketId: market.id.toString() }}>
                    <p className="hover:cursor-pointer hover:underline">{market.name}</p>
                </Link>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <p>{market.market_details?.state}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass} text-right flex items-center justify-end gap-2`}>
                <Link to={`/dashboard/markets/edit/$marketId`} params={{ marketId: market.id.toString() }}>
                    <Button size="icon" className="relative">
                        <FaPencil />
                    </Button>
                </Link>
                <RemoveMarket market={market} />
            </TableCell>
        </TableRow>
    );
};

export default MarketListItem;