import type { EventWithMarket } from '@repo/supabase';

import { FaClock, FaLocationDot } from 'react-icons/fa6';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import EventBadges from './EventBadges';

dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(timezone);

interface EventDetailsProps {
    event: EventWithMarket
};

function EventDetails({ event }: EventDetailsProps) {    

    const dateFromDate = dayjs(event.date_from).tz(dayjs.tz.guess()).format("MMMM Do, YYYY");
    const dateFromTime = dayjs(event.date_from).tz(dayjs.tz.guess()).format("h:mm A");
    const dateToTime = dayjs(event.date_to).tz(dayjs.tz.guess()).format("h:mm A");

    const isPast = dayjs(event.date_to).isBefore(dayjs());
    const isToday = dayjs(dayjs(event.date_from).format("M/D/YYYY")).isSame(dayjs(dayjs().format("M/D/YYYY")));

    return(
        <div>
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
        </div>
    );
};

export default EventDetails;