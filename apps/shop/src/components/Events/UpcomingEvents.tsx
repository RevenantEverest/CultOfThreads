"use client"

import type { Event } from '@repo/entities';

import Link from 'next/link';

import { Button, MotionFadeIn } from '@repo/ui';
import EventListItem from './EventListItem';

import { useBreakpointGrid } from '@@shop/hooks';
import { events } from '@repo/queries';

interface UpcomingEventsProps {
    isEventsPage?: boolean
};

function UpcomingEvents({ isEventsPage }: UpcomingEventsProps) {

    const breakpointGrid = useBreakpointGrid({
        overrides: {
            XL: 3,
            XXL: 3
        }
    });

    const query = events.hooks.useUpcoming();

    const renderEvents = (events: Event[]) => {
        const itemsPerRow = breakpointGrid.itemsPerRow;

        if(!itemsPerRow) {
            return;
        }

        return events.map((item, index) => {
            const staggerDelay = breakpointGrid.getAnimationStaggerValues(index, itemsPerRow);
            
            return(
                <MotionFadeIn
                    key={`event-${item.id}`}
                    fadeDelay={staggerDelay}
                    posYDelay={staggerDelay}
                    className="w-full"
                >
                    <EventListItem event={item} />
                </MotionFadeIn>
            );
        });
    };

    return(
        <div className="flex flex-col items-center justify-center gap-5 w-full">
            <MotionFadeIn className="w-full">
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
            <div 
                className={`
                    ${breakpointGrid.gridClasses} gap-5 items-center justify-center gap-y-10 md:gap-y-20 pb-20
                `}
            >
                {query.data && breakpointGrid.itemsPerRow && renderEvents(query.data.results)}
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