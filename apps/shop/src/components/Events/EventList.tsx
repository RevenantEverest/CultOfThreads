"use client"

import { eventsApi, EventWithMarket } from '@repo/supabase';
import { useQuery } from '@tanstack/react-query';
import EventListItem from './EventListItem';

function EventList() {

    const query = useQuery({
        queryKey: ["events"],
        queryFn: eventsApi.fetchAll
    });

    const renderEvents = (events: EventWithMarket[]) => {
        return events.sort((a, b) => b.date_from.localeCompare(a.date_from)).map((item) => (
            <EventListItem key={`event-${item.id}`} event={item} />
        ));
    };

    return(
        <div className="flex flex-col md:flex-row gap-5 items-center justify-center flex-wrap gap-y-20 pb-20">
            {query.data && renderEvents(query.data)}
        </div>
    );
};

export default EventList;