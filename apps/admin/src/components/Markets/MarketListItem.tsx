import type { MarketWithDetails } from '@repo/supabase';

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
                <div className="w-24 h-24 flex overflow-hidden">
                    {
                        market.details?.logo_url &&
                        <img 
                            className="shrink-0 relative object-cover w-full h-full rounded-lg"
                            src={`${URLS.SUPABASE_STORAGE}/${market.details.logo_url}`} 
                            alt={market.name}
                        />
                    }
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <Link to="/dashboard/markets/edit/$marketId" params={{ marketId: market.id.toString() }}>
                    <p className="hover:cursor-pointer hover:underline">{market.name}</p>
                </Link>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <p>{market.details?.state}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="h-full w-full flex items-center justify-end gap-2">
                    <Link to={`/dashboard/markets/edit/$marketId`} params={{ marketId: market.id.toString() }}>
                        <Button size="icon" className="relative">
                            <FaPencil />
                        </Button>
                    </Link>
                    <RemoveMarket market={market} />
                </div>
            </TableCell>
        </TableRow>
    );
};

export default MarketListItem;