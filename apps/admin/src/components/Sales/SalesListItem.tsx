import type { SaleFull } from '@repo/supabase';

import { Link } from '@tanstack/react-router';
import { FaDollarSign, FaPencil } from 'react-icons/fa6';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';

import {
    Button,
    TableCell,
    TableRow
} from '@repo/ui';
import RemoveSale from './RemoveSale';

dayjs.extend(advancedFormat);
dayjs.extend(timezone);

interface SalesListItemProps {
    sale: SaleFull
};

function SalesListItem({ sale }: SalesListItemProps) {

    const cellClass = "py-4";
    const purchaseDate = dayjs(sale.purchase_date).tz(dayjs.tz.guess()).format("M/DD/YY [-] h:mm A");

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
                <Link to="/dashboard/sales/edit/$saleId" params={{ saleId: sale.id.toString() }}>
                    <p className="hover:cursor-pointer hover:underline">{sale?.product?.name ?? sale.product_name}</p>
                </Link>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center text-muted">
                    <FaDollarSign />
                    <p>{sale.original_product_price.toLocaleString()}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <FaDollarSign className="text-primary" />
                    <p>{sale.sale_price.toLocaleString()}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <p>{purchaseDate}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <p>{sale.sale_type}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    {
                        sale.event?.id ?
                        <Link className="hover:underline" to={`/dashboard/events/item/$eventId`} params={{ eventId: sale.event.id }}>
                            {sale.event.market.name}
                        </Link>
                        :
                        <p className="text-muted">{sale.market_name}</p>
                    }
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="h-full w-full flex items-center justify-end gap-2">
                    <Link to={`/dashboard/sales/edit/$saleId`} params={{ saleId: sale.id.toString() }}>
                        <Button size="icon" className="relative">
                            <FaPencil />
                        </Button>
                    </Link>
                    <RemoveSale sale={sale} />
                </div>
            </TableCell>
        </TableRow>
    );
};

export default SalesListItem;