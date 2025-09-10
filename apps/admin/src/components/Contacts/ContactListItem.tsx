import type { Contact } from '@repo/supabase';

import { Link } from '@tanstack/react-router';
import { FaPencil } from 'react-icons/fa6';
import dayjs from 'dayjs';

import { Button, TableCell, TableRow } from '@repo/ui';
import RemoveContact from './RemoveContact';

interface ContactListItemProps {
    contact: Contact
};

function ContactListItem({ contact }: ContactListItemProps) {

    const cellClass = "py-4";
    const createdAt = dayjs(contact.created_at).format("MMMM D, YYYY");

    const renderPhone = (phone: string): string => {
        return `( ${phone.substring(0, 3)} )` + " " + `${phone.substring(3, 6)} - ${phone.substring(6, 10)}`; 
    };

    return(
        <TableRow className="border-b-muted font-semibold">
            <TableCell className={`${cellClass}`}>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <Link to="/dashboard/contacts/edit/$contactId" params={{ contactId: contact.id }}>
                    <p className="hover:cursor-pointer hover:underline">
                        {(contact.first_name ?? "") + " " + (contact.last_name ?? "")}
                    </p>
                </Link>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <p>{contact.email}</p>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <p>{contact.phone && renderPhone(contact.phone)}</p>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <p>{createdAt}</p>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="h-full w-full flex items-center justify-end gap-2">
                    <Link to={`/dashboard/contacts/edit/$contactId`} params={{ contactId: contact.id }}>
                        <Button size="icon" className="relative">
                            <FaPencil />
                        </Button>
                    </Link>
                    <RemoveContact contact={contact} />
                </div>
            </TableCell>
        </TableRow>
    );
};

export default ContactListItem;