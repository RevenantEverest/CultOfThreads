import type { Market } from '@repo/entities';

import { Card, CardContent, TableFlatList } from '@repo/ui';
import { Spinner } from '@@admin/components/Common';
import MarketsHeader from './MarketsHeader';
import MarketsRow from './MarketsRow';

interface MarketsTableProps {
    markets?: Market[],
    search: string,
    dataAmount?: number,
    isLoading?: boolean,
    nextPage: () => void
};

function MarketsTable({ markets, search, dataAmount=0, isLoading, nextPage }: MarketsTableProps) {


    const parseSearchedResults = () => {
        const data = markets ?? [];
        return data.filter((item) => {
            if(search) {
                const name = (item.name ?? "");
                return name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            }

            return item;        
        });
    };

    return(
        <Card>
            <CardContent className="py-8">
                <TableFlatList
                    keyExtractor={(item: Market) => item.id}
                    data={parseSearchedResults()}
                    renderHeader={() => (<MarketsHeader dataAmount={dataAmount} />)}
                    renderItem={(item: Market, key) => (
                        <MarketsRow key={key} market={item} />
                    )}
                    onEndReached={nextPage}
                    renderLoading={() => <Spinner />}
                    isLoading={isLoading}
                />
            </CardContent>
        </Card>
    )
};

export default MarketsTable;