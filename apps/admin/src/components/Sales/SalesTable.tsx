import type { Sale } from '@repo/entities';

import { Card, CardContent, TableFlatList } from '@repo/ui';
import { Spinner } from '@@admin/components/Common';

import SalesRow from './SalesRow';
import SalesHeader from './SalesHeader';

interface SalesTableProps {
    sales?: Sale[],
    search: string,
    dataAmount?: number,
    isLoading?: boolean,
    nextPage: () => void
};

function SalesTable({ sales, search, dataAmount=0, isLoading, nextPage }: SalesTableProps) {

    const parseSearchedResults = () => {
        const data = sales ?? [];
        return data.filter((item) => {
            if(search) {
                const name = (item.productName ?? "");
                return name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            }

            return item;        
        });
    };

    return(
        <Card>
            <CardContent className="py-8">
                <TableFlatList
                    keyExtractor={(item: Sale) => item.id}
                    data={parseSearchedResults()}
                    renderHeader={() => (<SalesHeader dataAmount={dataAmount} />)}
                    renderItem={({ item, key }) => (
                        <SalesRow key={key} sale={item} />
                    )}
                    onEndReached={nextPage}
                    renderLoading={() => <Spinner />}
                    isLoading={isLoading}
                />
            </CardContent>
        </Card>
    );
};

export default SalesTable;