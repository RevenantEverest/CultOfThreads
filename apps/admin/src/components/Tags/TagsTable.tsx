import type { Tag } from '@repo/entities'

import { Card, CardContent, TableFlatList } from '@repo/ui';
import { Spinner } from '@@admin/components/Common';

import TagsHeader from './TagsHeader';
import TagsRow from './TagsRow';

interface TagsTableProps {
    tags?: Tag[],
    search: string,
    dataAmount?: number,
    isLoading?: boolean,
    nextPage: () => void
};

function TagsTable({ tags, search, dataAmount=0, isLoading, nextPage }: TagsTableProps) {

    const parseSearchedResults = () => {
        const data = tags ?? [];
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
                    keyExtractor={(item: Tag) => item.id}
                    data={parseSearchedResults()}
                    renderHeader={() => (<TagsHeader dataAmount={dataAmount} />)}
                    renderItem={(item: Tag, key) => (
                        <TagsRow key={key} tag={item} />
                    )}
                    onEndReached={nextPage}
                    renderLoading={() => <Spinner />}
                    isLoading={isLoading}
                />
            </CardContent>
        </Card>
    );
};

export default TagsTable;