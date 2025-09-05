"use client"

import type { EventWithMarket } from '@repo/supabase';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { Button } from '@repo/ui';
import EventListItem from './EventListItem';

import { eventsApi } from '@repo/supabase';

function UpcomingEvents() {

    const query = useQuery({
        queryKey: ["upcoming_events"],
        queryFn: () => eventsApi.fetchUpcoming({ limit: 3 })
    });

    const renderEvents = (events: EventWithMarket[]) => {
        return events.sort((a, b) => a.date_from.localeCompare(b.date_from)).map((item) => (
            <EventListItem key={`event-${item.id}`} event={item} />
        ));
    };

    return(
        <div className="flex flex-col items-center justify-center gap-5">
            <div className="text-center pb-20">
                <p className="text-md md:text-2xl text-muted mb-2 uppercase font-semibold">See where we&apos;ll be popping up next!</p>
                <h1 className="text-4xl md:text-6xl font-bold font-beach">Upcoming Markets</h1>
            </div>
            <div className="flex flex-col md:flex-row gap-5 items-center justify-center flex-wrap gap-y-10 md:gap-y-20 pb-20">
                {query.data && renderEvents(query.data)}
            </div>
            <div className="flex flex-col gap-5 items-center">
                <p className="font-semibold text-primary text-lg">Want to see where else we&apos;ll be?</p>
                <Link href="/events">
                    <Button>
                        See All Events
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default UpcomingEvents;