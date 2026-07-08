import type { Newsletter } from '@repo/entities';

import { Card, CardContent, TableFlatList } from '@repo/ui';
import { Spinner } from '@@admin/components/Common';

import SignUpsRow from './SignUpsRow';
import SignUpsHeader from './SignUpsHeader';

interface NewsletterListProps {
    signUps?: Newsletter[],
    search: string
    dataAmount?: number,
    isLoading?: boolean,
    nextPage: () => void
};

function SignUpsTable({ signUps, search, dataAmount=0, isLoading, nextPage }: NewsletterListProps) {

    const parseSearchedResults = () => {
        const data = signUps ?? [];
        return data.filter((item) => {
            if(search) {
                const field = (item.contact.firstName ?? "") || (item.contact.email ?? "");
                return field.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            }

            return item;
        });
    };

    return(
        <Card>
            <CardContent>
                <TableFlatList
                    keyExtractor={(item: Newsletter) => item.id}
                    data={parseSearchedResults()}
                    renderHeader={() => (
                        <SignUpsHeader dataAmount={dataAmount} />
                    )}
                    renderItem={({ item, key }) => (
                        <SignUpsRow key={key} item={item} />
                    )}
                    onEndReached={nextPage}
                    renderLoading={() => <Spinner />}
                    isLoading={isLoading}
                />
            </CardContent>
        </Card>
    );
};

export default SignUpsTable;
  