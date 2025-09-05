import type { EventWithMarket } from '@repo/supabase';

import { Link } from '@tanstack/react-router';
import { FaPencil } from 'react-icons/fa6';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(advancedFormat);
dayjs.extend(timezone);

import {
    Button,
    TableCell,
    TableRow
} from '@repo/ui';
import RemoveEvent from './RemoveEvent';

import { URLS } from '@@admin/constants';

interface EventListItemProps {
    event: EventWithMarket
};

function EventListItem({ event }: EventListItemProps) {

    const cellClass = "py-4";
    const dateFrom = dayjs(event.date_from).tz(dayjs.tz.guess()).format("MMMM Do, YYYY h:mm A");
    const dateTo = dayjs(event.date_to).tz(dayjs.tz.guess()).format("MMMM Do, YYYY h:mm A");

    return(
        <TableRow className="border-b-muted font-semibold">
            <TableCell className={`${cellClass}`}>
                <div className="w-24 h-24 flex overflow-hidden">
                {
                    event.market.details?.logo_url &&
                    <img 
                        className="shrink-0 relative object-cover w-full h-full rounded-lg"
                        src={`${URLS.supabaseStorageUrl}/${event.flyer_url}`} 
                        alt={event.market.name}
                    />
                }
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <Link to="/dashboard/events/edit/$eventId" params={{ eventId: event.id.toString() }}>
                    <p className="hover:cursor-pointer hover:underline">{event.market.name}</p>
                </Link>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <p>{event.market.details?.state}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <p>{dateFrom}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <p>{dateTo}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="h-full w-full flex items-center justify-end gap-2">
                    <Link to={`/dashboard/events/edit/$eventId`} params={{ eventId: event.id.toString() }}>
                        <Button size="icon" className="relative">
                            <FaPencil />
                        </Button>
                    </Link>
                    <RemoveEvent event={event} />
                </div>
            </TableCell>
        </TableRow>
    );
};

export default EventListItem;