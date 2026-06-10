import type { TrafficAnalytics } from '@repo/entities';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(advancedFormat);
dayjs.extend(timezone);

import {
    TableCell,
    TableRow
} from '@repo/ui';


interface TrafficAnalyticsRowProps {
    analytic: TrafficAnalytics
};

function TrafficAnalyticsRow({ analytic }: TrafficAnalyticsRowProps) {

    const cellClass = "py-4";
    const createdAt = dayjs(analytic.createdAt).tz(dayjs.tz.guess()).format("MMMM Do, YYYY h:mm A");

    return(
        <TableRow className="border-b-muted font-semibold">
            <TableCell className={`${cellClass}`}>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <p className="hover:cursor-pointer">{analytic.utmCampaign}</p>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <p className="hover:cursor-pointer">{analytic.utmSource}</p>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <p>{analytic.landingPageUrl}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <p>{analytic.utmMedium}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <p>{analytic.utmTerm}</p>
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

export default TrafficAnalyticsRow;