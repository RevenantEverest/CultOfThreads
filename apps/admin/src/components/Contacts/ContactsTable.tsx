import type { Contact } from '@repo/entities';

import { Card, CardContent, TableFlatList } from '@repo/ui';
import { Spinner } from '@@admin/components/Common';
import ContactsHeader from './ContactsHeader';
import ContactsRow from './ContactsRow';

interface ContactsTableProps {
    contacts?: Contact[],
    search: string,
    dataAmount?: number,
    isLoading?: boolean,
    nextPage: () => void
};

function ContactsTable({ contacts, search, dataAmount=0, isLoading, nextPage }: ContactsTableProps) {

    const parseSearchedResults = () => {
        const data = contacts ?? [];
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
                    keyExtractor={(item: Contact) => item.id}
                    data={parseSearchedResults()}
                    renderHeader={() => (<ContactsHeader dataAmount={dataAmount} />)}
                    renderItem={(item: Contact, key) => (
                        <ContactsRow key={key} contact={item} />
                    )}
                    onEndReached={nextPage}
                    renderLoading={() => <Spinner />}
                    isLoading={isLoading}
                />
            </CardContent>
        </Card>
    );
};

export default ContactsTable;