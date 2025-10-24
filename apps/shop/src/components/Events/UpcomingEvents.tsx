"use client"

import type { EventWithMarket } from '@repo/supabase';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { Button, MotionFadeIn } from '@repo/ui';
import { useBreakpoints } from '@repo/ui/hooks';
import EventListItem from './EventListItem';

import { eventsApi } from '@repo/supabase';

interface UpcomingEventsProps {
    amount?: number,
    isEventsPage?: boolean
};

function UpcomingEvents({ amount, isEventsPage }: UpcomingEventsProps) {

    const breakpoint = useBreakpoints();
    const query = useQuery({
        queryKey: ["upcoming_events"],
        queryFn: () => eventsApi.fetchUpcoming({ limit: 3 })
    });

    const [itemsInRow, setItemsInRow] = useState<number | null>(null);

    useEffect(() => {
        switch(breakpoint) {
            case "XXL":
                setItemsInRow(3);
                break;
            case "XL": 
                setItemsInRow(3);
                break;
            case "LG":
                setItemsInRow(3);
                break;
            case "MD":
                setItemsInRow(3);
                break;
            case "SM": 
                setItemsInRow(1);
                break;
        }
    }, [breakpoint]);

    const renderEvents = (events: EventWithMarket[]) => {
        if(!itemsInRow) {
            return;
        }

        const ROW_STAGGER_TIME = 0.1;
        const COLUMN_STAGGER_TIME = 0.1;

        const sortedEvents = events.sort((a, b) => a.date_from.localeCompare(b.date_from));

        return sortedEvents.slice(0, amount ?? events.length).map((item, index) => {
            const rowIndex = Math.floor(index / itemsInRow);
            const colIndex = index % itemsInRow;

            const rowDelay = rowIndex * ROW_STAGGER_TIME;
            const colDelay = colIndex * COLUMN_STAGGER_TIME;
            const staggerDelay = rowDelay + colDelay;
            
            return(
                <MotionFadeIn
                    key={`event-${item.id}`}
                    fadeDelay={staggerDelay}
                    posYDelay={staggerDelay}
                >
                    <EventListItem event={item} />
                </MotionFadeIn>
            );
        });
    };

    return(
        <div className="flex flex-col items-center justify-center gap-5">
            <MotionFadeIn>
                <div className="text-center pb-20">
                    <p className="text-md md:text-2xl text-muted mb-2 uppercase font-semibold">See where we&apos;ll be popping up next!</p>
                    <h1 className="text-4xl md:text-6xl font-bold font-beach">
                        {
                            isEventsPage ?
                            "Upcoming Market" :
                            "Upcoming Markets"
                        }
                    </h1>
                </div>
            </MotionFadeIn>
            <div className="flex flex-col md:flex-row gap-5 items-center justify-center flex-wrap gap-y-10 md:gap-y-20 pb-20">
                {query.data && itemsInRow && renderEvents(query.data)}
            </div>
            {
                !isEventsPage &&
                <MotionFadeIn>
                    <div className="flex flex-col gap-5 items-center">
                        <p className="font-semibold text-primary text-lg">Want to see where else we&apos;ll be?</p>
                        <Link href="/events">
                            <Button>
                                See All Events
                            </Button>
                        </Link>
                    </div>
                </MotionFadeIn>
            }
        </div>
    );
};

export default UpcomingEvents;