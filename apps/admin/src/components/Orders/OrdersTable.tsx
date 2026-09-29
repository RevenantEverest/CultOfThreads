import type { Order } from '@repo/entities';

import { Card, CardContent, TableFlatList } from '@repo/ui';
import { Spinner } from '@@admin/components/Common';

import OrdersHeader from './OrdersHeader';
import OrdersRow from './OrdersRow';

interface OrdersTableProps {
    orders?: Order[],
    search: string,
    dataAmount?: number,
    isLoading?: boolean,
    nextPage: () => void
};

function OrdersTable({ orders, search, dataAmount=0, isLoading, nextPage }: OrdersTableProps) {

    const parseSearchedResults = () => {
        const data = orders ?? [];
        return data.filter((item) => {
            if(search) {
                const name = (item.id ?? "");
                return name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            }

            return item;        
        });
    };

    return(
        <Card>
            <CardContent className="py-8">
                <TableFlatList
                    keyExtractor={(item: Order) => item.id}
                    data={parseSearchedResults()}
                    renderHeader={() => (<OrdersHeader dataAmount={dataAmount} />)}
                    renderItem={({ item, key }) => (
                        <OrdersRow key={key} order={item} />
                    )}
                    onEndReached={nextPage}
                    renderLoading={() => <Spinner />}
                    isLoading={isLoading}
                />
            </CardContent>
        </Card>
    );
};

export default OrdersTable;