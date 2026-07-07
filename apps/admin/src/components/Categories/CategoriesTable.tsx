import type { Category } from '@repo/entities'

import { Card, CardContent, TableFlatList } from '@repo/ui';
import { Spinner } from '@@admin/components/Common';

import CategoriesHeader from './CategoriesHeader';
import CategoriesRow from './CategoriesRow';

interface CategoriesTableProps {
    categories?: Category[],
    search: string,
    dataAmount?: number,
    isLoading?: boolean,
    nextPage: () => void
};

function CategoriesTable({ categories, search, dataAmount=0, isLoading, nextPage }: CategoriesTableProps) {

    const parseSearchedResults = () => {
        const data = categories ?? [];
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
                    keyExtractor={(item: Category) => item.id}
                    data={parseSearchedResults()}
                    renderHeader={() => (<CategoriesHeader dataAmount={dataAmount} />)}
                    renderItem={(item: Category, key) => (
                        <CategoriesRow key={key} category={item} />
                    )}
                    onEndReached={nextPage}
                    renderLoading={() => <Spinner />}
                    isLoading={isLoading}
                />
            </CardContent>
        </Card>
    );
};

export default CategoriesTable;