import type { EventWithMarket } from '@repo/supabase';

import {
    Card,
    CardContent,
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from '@repo/ui';
import EventListItem from './EventListItem';

interface EventListProps {
    search?: string,
    events: EventWithMarket[]
};

function EventList({ search, events }: EventListProps) {

    const headClass = "bg-card-light font-semibold";

    const eventList = events.filter((el) => {
        if(el.market.name && search) {
            return el.market.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }

        return el;        
    });

    return(
        <Card>
            <CardContent className="py-8">
                <Table>
                    <TableHeader>
                        <TableRow className="font-bold border-b-muted hover:!bg-transparent">
                            <TableHead className={`${headClass} font-bold w-1/10 rounded-tl-lg`}></TableHead>
                            <TableHead className={`${headClass}`}>Market</TableHead>
                            <TableHead className={`${headClass} text-center`}>Address</TableHead>
                            <TableHead className={`${headClass} text-center`}>Date From</TableHead>
                            <TableHead className={`${headClass} text-center`}>Date To</TableHead>
                            <TableHead className={`${headClass} text-right rounded-tr-lg`}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {eventList.sort((a, b) => b.date_from.localeCompare(a.date_from)).map((event) => (
                            <EventListItem key={event.id} event={event} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default EventList;