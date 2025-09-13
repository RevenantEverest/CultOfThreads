import type { EventWithMarket } from '@repo/supabase';

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@repo/ui';
import dayjs from 'dayjs';

interface EventSelectProps {
    value: string,
    events: EventWithMarket[],
    onChange: (value: string) => void
};

function EventSelect({ value, events, onChange }: EventSelectProps) {

    const renderMarkets = () => {
        return events.sort((a, b) => a.market.name.localeCompare(b.market.name)).map((event) => {
            
            const eventDate = dayjs(event.date_from).format("MMMM D, YYYY");

            return(
                <SelectItem key={`event-select-${event.market.name}`} value={event.id}>
                    {event.market.name} - <span className="text-primary">{eventDate}</span>
                </SelectItem>
            );
        });
    };

    return(
        <div>
            <p className="text-sm font-bold mb-1.5">Event</p>
            <Select 
                value={value ?? undefined} 
                onValueChange={(value) => onChange(value)}
            >
                <SelectTrigger className="bg-card-light px-2.5 py-2.5 rounded-md font-semibold text-sm w-full">
                    <SelectValue placeholder="Choose An Event" />
                </SelectTrigger>
                <SelectContent className="font-semibold">
                    {renderMarkets()}
                </SelectContent>
            </Select>
        </div>
    );
};

export default EventSelect;