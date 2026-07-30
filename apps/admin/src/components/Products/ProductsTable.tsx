import type { Product } from '@repo/entities';

import { Card, CardContent, TableFlatList } from '@repo/ui';
import { Spinner } from '@@admin/components/Common';

import ProductsHeader from './ProductsHeader';
import ProductsRow from './ProductsRow';

interface ProductsTableProps {
    products?: Product[],
    search: string,
    dataAmount?: number,
    isLoading?: boolean,
    nextPage: () => void
};

function ProductsTable({ products, search, dataAmount=0, isLoading, nextPage }: ProductsTableProps) {

    const parseSearchedResults = () => {
        const data = products ?? [];
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
                    keyExtractor={(item: Product) => item.id}
                    data={parseSearchedResults()}
                    renderHeader={() => (<ProductsHeader dataAmount={dataAmount} />)}
                    renderItem={({ item, key }) => (
                        <ProductsRow key={key} product={item} />
                    )}
                    onEndReached={nextPage}
                    renderLoading={() => <Spinner />}
                    isLoading={isLoading}
                />
            </CardContent>
        </Card>
    );
};

export default ProductsTable;