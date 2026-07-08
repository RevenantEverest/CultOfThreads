import type { ContactForm } from '@repo/entities';

import { Card, CardContent, TableFlatList } from '@repo/ui';
import { Spinner } from '@@admin/components/Common';
import SubmissionRow from './SubmissionRow';
import SubmissionsHeader from './SubmissionsHeader';

interface SubmissionsTableProps {
    submissions?: ContactForm[],
    search: string,
    dataAmount?: number,
    isLoading?: boolean,
    nextPage: () => void
};

function SubmissionsTable({ submissions, dataAmount=0, search, nextPage, isLoading }: SubmissionsTableProps) {

    const parseSearchedResults = () => {
        const data = submissions ?? [];
        return data.filter((item) => {
            if(search) {
                const name = (item.firstName ?? "") + " " + (item.lastName ?? "");
                return name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            }

            return item;        
        });
    };

    return(
        <Card>
            <CardContent className="py-8">
                <TableFlatList
                    keyExtractor={(item: ContactForm) => item.id}
                    data={parseSearchedResults()}
                    renderHeader={() => (<SubmissionsHeader dataAmount={dataAmount} />)}
                    renderItem={({ item, key }) => (
                        <SubmissionRow key={key} submission={item} />
                    )}
                    onEndReached={nextPage}
                    renderLoading={() => <Spinner />}
                    isLoading={isLoading}
                />
            </CardContent>
        </Card>
    );
};

export default SubmissionsTable;

