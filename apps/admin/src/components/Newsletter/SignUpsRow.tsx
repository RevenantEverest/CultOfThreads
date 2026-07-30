import type { Newsletter } from '@repo/entities';

import dayjs from 'dayjs';
import { TableCell, TableRow } from '@repo/ui';

interface SignUpsRowProps {
    item: Newsletter
};

function SignUpsRow({ item }: SignUpsRowProps) {

    const cellClass = "py-4";
    const createdAt = dayjs(item.createdAt).format("MMMM D, YYYY");

    return(
        <TableRow className="border-b-muted font-semibold">
            <TableCell className={`${cellClass}`}>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <p className="hover:cursor-pointer">
                    {(item.contact.firstName ?? "") + " " + (item.contact.lastName ?? "")}
                </p>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <p>{item.contact.email}</p>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <p>{createdAt}</p>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="h-full w-full flex items-center justify-end gap-2">
                </div>
            </TableCell>
        </TableRow>
    );
};

export default SignUpsRow;