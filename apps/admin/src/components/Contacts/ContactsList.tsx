import type { Contact } from '@repo/supabase';
import { Card, CardContent } from '@repo/ui';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@repo/ui';
import ContactListItem from './ContactListItem';
import { FaCalendar, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa6';

interface ContactListProps {
    contacts: Contact[],
    search: string
};

function ContactsList({ contacts, search }: ContactListProps) {

    const headClass = "bg-card-light font-semibold";

    const contactsList = contacts.filter((el) => {
        if(search) {
            const name = (el.first_name ?? "") + " " + (el.last_name ?? "");
            return name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }

        return el;        
    });

    return(
        <Card>
            <CardContent className="py-8">
                <Table>
                    <TableHeader>
                        <TableRow className="font-bold border-b-muted hover:!bg-transparent">
                            <TableHead className={`${headClass} font-bold w-1/10 rounded-tl-lg`}></TableHead>
                            <TableHead className={`${headClass}`}>
                                <div className="flex items-center justify-start gap-2">
                                    <FaUser />
                                    Name <span className="text-xs text-accent font-semibold">({contacts.length})</span>
                                </div>
                            </TableHead>
                            <TableHead className={`${headClass} text-center`}>
                                <div className="flex items-center gap-2">
                                    <FaEnvelope />
                                    Email
                                </div>
                            </TableHead>
                            <TableHead className={`${headClass} text-center`}>
                                <div className="flex items-center gap-2">
                                    <FaPhone />
                                    Phone
                                </div>
                            </TableHead>
                            <TableHead className={`${headClass} text-center`}>
                                <div className="flex items-center gap-2">
                                    <FaCalendar />
                                    Created At
                                </div>
                            </TableHead>
                            <TableHead className={`${headClass} text-right rounded-tr-lg`}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            contactsList.sort((a, b) => {
                                const aName = (a.first_name && a.last_name) ? a.first_name + " " + a.last_name : "";
                                const bName = (b.first_name && b.last_name) ? b.first_name + " " + b.last_name : "";
                                return aName.localeCompare(bName)
                            }).map((contact) => (
                                <ContactListItem key={contact.id} contact={contact} />
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default ContactsList;
  