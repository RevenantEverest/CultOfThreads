import type { Event } from '@repo/entities';

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue,
    FlatList
} from '@repo/ui';
import { Spinner } from '@@admin/components/Common';
import dayjs from 'dayjs';

interface EventSelectProps {
    value: string,
    events: Event[],
    onChange: (value: string) => void,
    nextPage: () => void,
    isLoading?: boolean
};

function EventSelect({ value, events, onChange, nextPage, isLoading }: EventSelectProps) {

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
                    <FlatList
                        keyExtractor={(item: Event) => item.id}
                        data={events}
                        renderItem={({ item, key }) => {
                            const eventDate = dayjs(item.dateFrom).format("MMMM D, YYYY");

                            return(
                                <SelectItem key={key} value={item.id}>
                                    {item.market.name} - <span className="text-primary">{eventDate}</span>
                                </SelectItem>
                            );
                        }}
                        onEndReached={nextPage}
                        renderLoading={() => <Spinner />}
                        isLoading={isLoading}
                    />
                </SelectContent>
            </Select>
        </div>
    );
};

export default EventSelect;