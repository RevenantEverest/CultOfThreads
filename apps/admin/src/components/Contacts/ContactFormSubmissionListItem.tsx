import type { ContactFormSubmission, ContactFormSubmissionStatus } from '@repo/supabase';

import { Link } from '@tanstack/react-router';
import dayjs from 'dayjs';

import { TableCell, TableRow } from '@repo/ui';
import SubmissionStatusBadge from './SubmissionStatusBadge';

interface ContactFormSubmissionListItemProps {
    submission: ContactFormSubmission
};

function ContactFormSubmissionListItem({ submission }: ContactFormSubmissionListItemProps) {

    const cellClass = "py-4";
    const createdAt = dayjs(submission.created_at).format("MMMM D, YYYY");

    return(
        <TableRow className="border-b-muted font-semibold">
            <TableCell className={`${cellClass}`}>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <Link to="/dashboard/contacts/form/item/$submissionId" params={{ submissionId: submission.id }}>
                    <p className="hover:cursor-pointer hover:underline">
                        {submission.first_name + " " + submission.last_name}
                    </p>
                </Link>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <p>{submission.email}</p>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <SubmissionStatusBadge status={submission.status as ContactFormSubmissionStatus} size="sm" />
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

export default ContactFormSubmissionListItem;