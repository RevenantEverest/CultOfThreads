"use client"

import type { EventWithMarket } from '@repo/supabase';
import { Button, Card, CardContent, CardFooter, CardHeader } from '@repo/ui';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { URLS } from '@@shop/constants';
import Image from 'next/image';
import EventBadges from './EventBadges';

interface EventListItemProps {
    event: EventWithMarket
};

dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(timezone);

function EventListItem({ event }: EventListItemProps) {

    const dateFromDate = dayjs(event.date_from).tz(dayjs.tz.guess()).format("MMMM Do, YYYY");
    const dateFromTime = dayjs(event.date_from).tz(dayjs.tz.guess()).format("h:mm A");
    const dateToTime = dayjs(event.date_to).tz(dayjs.tz.guess()).format("h:mm A");

    const isPast = dayjs(event.date_to).isBefore(dayjs());
    const isToday = dayjs(dayjs(event.date_from).format("M/D/YYYY")).isSame(dayjs(dayjs().format("M/D/YYYY"))); 

    return(
        <Card className="border-none">
            <CardHeader className="w-50 h-50 lg:w-100 lg:h-100 flex overflow-hidden p-0 relative">
                <Image
                    className="shrink-0 relative object-cover w-full h-full rounded-t-lg"
                    height={500}
                    width={500}
                    src={URLS.supabaseStorageUrl + event.flyer_url}
                    alt={event.market.name}
                />
                {
                    isPast &&
                    <div className="absolute bg-black/60 top-0 h-full w-full" />
                }
            </CardHeader>
            <CardContent className="pt-7 flex flex-col gap-5">
                <div className="flex">
                    <EventBadges isPast={isPast} isToday={isToday} />
                </div>
                <div>
                    <p className={`font-bold text-xl ${isPast && "line-through text-muted"}`}>{event.market.name}</p>
                </div>
                <div>
                    <p className={`font-semibold ${isPast && "line-through text-muted"}`}>{dateFromDate}</p>
                    <p className={`font-semibold ${isPast && "line-through text-muted"}`}>{dateFromTime} - {dateToTime}</p>
                </div>
                <div>
                    <p className={`font-semibold ${isPast && "line-through text-muted"}`}>{event.address}</p>
                </div>
                <div className="flex gap-3">
                    <Button disabled={isPast}>
                        View Flyer
                    </Button>
                    <Button disabled={isPast} variant="outline">
                        Copy Address
                    </Button>
                </div>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    );
};

export default EventListItem;