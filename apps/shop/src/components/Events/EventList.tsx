"use client"

import type { Event } from '@repo/entities';

import { FlatList } from '@repo/ui';
import { Spinner } from '@@shop/components/Common';
import EventListItem from './EventListItem';

import { events } from '@repo/queries';

function EventList() {

    const query = events.hooks.useIndexPublic({
        pagination: {
            limit: 10
        }
    });

    const nextPage = () => {
        if(!query.hasNextPage) return;

        query.fetchNextPage();
    };

    return(
        <div className="flex flex-col md:flex-row gap-5 items-center justify-center flex-wrap gap-y-20 pb-20">
            <FlatList
                keyExtractor={(item: Event) => item.id}
                data={
                    query.data?.pages.flatMap((page) => page.results) ?? []
                }
                renderItem={({ item, key }) => (
                    <EventListItem key={key} event={item} />
                )}
                renderLoading={() => <Spinner />}
                isLoading={query.isLoading || query.isFetching || !query.data}
                onEndReached={nextPage}
            />
        </div>
    );
};

export default EventList;