import type { NewsletterWithContact } from '@repo/supabase';

import dayjs from 'dayjs';

import { TableCell, TableRow } from '@repo/ui';

interface NewsletterListItemProps {
    submission: NewsletterWithContact
};

function NewsletterListItem({ submission }: NewsletterListItemProps) {

    const cellClass = "py-4";
    const createdAt = dayjs(submission.created_at).format("MMMM D, YYYY");

    return(
        <TableRow className="border-b-muted font-semibold">
            <TableCell className={`${cellClass}`}>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <p className="hover:cursor-pointer">
                    {(submission.contact.first_name ?? "") + " " + (submission.contact.last_name ?? "")}
                </p>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <p>{submission.contact.email}</p>
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

export default NewsletterListItem;