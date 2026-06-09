import type { Event } from '@repo/entities';

import { Card, CardContent, TableFlatList } from '@repo/ui';
import { Spinner } from '@@admin/components/Common';

import EventsHeader from './EventsHeader';
import EventsRow from './EventsRow';

interface EventsTableProps {
    events?: Event[],
    search: string,
    dataAmount?: number,
    isLoading?: boolean,
    nextPage: () => void
};

function EventsTable({ events, search, dataAmount=0, isLoading, nextPage }: EventsTableProps) {

    const parseSearchedResults = () => {
        const data = events ?? [];
        return data.filter((item) => {
            if(search) {
                const name = (item.market.name ?? "");
                return name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            }

            return item;        
        });
    };

    return(
        <Card>
            <CardContent className="py-8">
                <TableFlatList
                    keyExtractor={(item: Event) => item.id}
                    data={parseSearchedResults()}
                    renderHeader={() => (<EventsHeader dataAmount={dataAmount} />)}
                    renderItem={(item: Event, key) => (
                        <EventsRow key={key} event={item} />
                    )}
                    onEndReached={nextPage}
                    renderLoading={() => <Spinner />}
                    isLoading={isLoading}
                />
            </CardContent>
        </Card>
    );
};

export default EventsTable;