"use client"

import type { EventWithMarket } from '@repo/supabase';

import { useState } from 'react';
import Image from 'next/image';
import { Button, Card, CardContent, CardHeader } from '@repo/ui';
import { useCopyToClipboard } from '@repo/ui/hooks';
import { FaClock, FaLocationDot } from 'react-icons/fa6';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { Lightbox } from '@@shop/components/Common';

import { URLS } from '@@shop/constants';
import EventBadges from './EventBadges';

interface EventListItemProps {
    event: EventWithMarket
};

dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(timezone);

function EventListItem({ event }: EventListItemProps) {

    const [open, setOpen] = useState(false);
    const copier = useCopyToClipboard();

    const flyerUrl = URLS.supabaseStorageUrl + event.flyer_url;

    const dateFromDate = dayjs(event.date_from).tz(dayjs.tz.guess()).format("MMMM Do, YYYY");
    const dateFromTime = dayjs(event.date_from).tz(dayjs.tz.guess()).format("h:mm A");
    const dateToTime = dayjs(event.date_to).tz(dayjs.tz.guess()).format("h:mm A");

    const isPast = dayjs(event.date_to).isBefore(dayjs());
    const isToday = dayjs(dayjs(event.date_from).format("M/D/YYYY")).isSame(dayjs(dayjs().format("M/D/YYYY")));

    return(
        <>
        <Card className="border-none w-80 lg:w-100 h-190 relative">
            <CardHeader className="w-80 h-80 lg:w-100 lg:h-100 flex overflow-hidden p-0 relative">
                <Image
                    className="shrink-0 relative object-cover w-full h-full rounded-t-lg"
                    height={500}
                    width={500}
                    src={flyerUrl}
                    alt={event.market.name}
                />
                {
                    isPast &&
                    <div className="absolute bg-black/60 top-0 h-full w-full" />
                }
            </CardHeader>
            <CardContent className="pt-7 flex flex-col gap-10">
                <div className="flex flex-col gap-5">
                    <div className="flex">
                        <EventBadges isPast={isPast} isToday={isToday} />
                    </div>
                    <div>
                        <p className={`font-bold text-2xl ${isPast &&"line-through text-muted"}`}>{event.market.name}</p>
                    </div>
                    <div>
                        <p className={`font-semibold text-lg ${isPast && "line-through text-muted"}`}>{dateFromDate}</p>
                        <p className={`flex items-center font-semibold ${isPast && "line-through text-muted"}`}>
                            {!isPast && <FaClock className="mr-2 text-sm text-accent mt-1" />}
                            {dateFromTime} - {dateToTime}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        {!isPast && <FaLocationDot className="text-primary" />}
                        {
                            isPast ?
                            <p className="font-semibold line-through text-muted">{event.address}</p>
                            :
                            <a 
                                href={`https://www.google.com/maps/place/${event.address.split(" ").join("+")}`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="font-semibold hover:cursor-pointer hover:underline hover:text-primary duration-150"
                            >
                                {event.address}
                            </a>
                        }
                    </div>
                </div>
                <div className="flex gap-3 absolute bottom-6">
                    <Button disabled={isPast} onClick={() => setOpen(true)}>
                        View Flyer
                    </Button>
                    <Button 
                        disabled={isPast} 
                        variant="outline"
                        onClick={() => copier.copy(event.address)}
                    >
                        Copy Address
                    </Button>
                </div>
            </CardContent>
        </Card>
        <Lightbox open={open} setOpen={setOpen} images={[flyerUrl]} />
        </>
    );
};

export default EventListItem;