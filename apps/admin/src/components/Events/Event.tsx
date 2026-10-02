import type { Event as EventEntity } from '@repo/entities';

import { URLS } from '@@admin/constants';
import EventDetails from './EventDetails';

interface EventProps {
    event: EventEntity
};

function Event({ event }: EventProps) {

    return(
        <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1">
                <img
                    className="rounded-xl border-muted border-4 hover:cursor-zoom-in"
                    src={URLS.SUPABASE_STORAGE + event.flyerUrl} 
                    alt={`featured`}
                />
            </div>
            <div className="flex-1">
                <EventDetails event={event} />
            </div>
        </div>
    );
};

export default Event;