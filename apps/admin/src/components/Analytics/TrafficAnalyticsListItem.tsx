import type { TrafficAnalytics } from '@repo/supabase';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(advancedFormat);
dayjs.extend(timezone);

import {
    TableCell,
    TableRow
} from '@repo/ui';


interface TrafficAnalyticsListItemProps {
    traffic: TrafficAnalytics
};

function TrafficAnalyticsListItem({ traffic }: TrafficAnalyticsListItemProps) {

    const cellClass = "py-4";
    const createdAt = dayjs(traffic.created_at).tz(dayjs.tz.guess()).format("MMMM Do, YYYY h:mm A");

    return(
        <TableRow className="border-b-muted font-semibold">
            <TableCell className={`${cellClass}`}>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <p className="hover:cursor-pointer">{traffic.utm_campaign}</p>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <p className="hover:cursor-pointer">{traffic.utm_source}</p>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <p>{traffic.landing_page_url}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <p>{traffic.utm_medium}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <p>{traffic.utm_term}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-end">
                    <p>{createdAt}</p>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default TrafficAnalyticsListItem;