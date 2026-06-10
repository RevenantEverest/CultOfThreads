import { TrafficAnalytics } from '@repo/entities';

import { Card, CardContent, TableFlatList } from '@repo/ui';
import { Spinner } from '@@admin/components/Common';
import TrafficAnalyticsHeader from './TrafficAnalyticsHeader';
import TrafficAnalyticsRow from './TrafficAnalyticsRow';

interface TrafficAnalyticsTableProps {
    analytics?: TrafficAnalytics[],
    search: string,
    dataAmount?: number,
    isLoading?: boolean,
    nextPage: () => void
};

function TrafficAnalyticsTable({ analytics, search, dataAmount=0, isLoading, nextPage }: TrafficAnalyticsTableProps) {

    const parseSearchedResults = () => {
        const data = analytics ?? [];
        return data.filter((item) => {
            if(search) {
                const source = (item.utmSource ?? "");
                return source.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            }

            return item;        
        });
    };

    return(
        <Card>
            <CardContent className="py-8">
                <TableFlatList
                    keyExtractor={(item: TrafficAnalytics) => item.id}
                    data={parseSearchedResults()}
                    renderHeader={() => (<TrafficAnalyticsHeader dataAmount={dataAmount} />)}
                    renderItem={(item: TrafficAnalytics, key) => (
                        <TrafficAnalyticsRow key={key} analytic={item} />
                    )}
                    onEndReached={nextPage}
                    renderLoading={() => <Spinner />}
                    isLoading={isLoading}
                />
            </CardContent>
        </Card>
    );
};

export default TrafficAnalyticsTable;