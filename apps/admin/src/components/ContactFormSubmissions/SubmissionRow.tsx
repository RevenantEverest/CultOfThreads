import type { ContactForm } from '@repo/entities';

import { Link } from '@tanstack/react-router';
import dayjs from 'dayjs';

import { TableCell, TableRow } from '@repo/ui';
import SubmissionStatusBadge from './SubmissionStatusBadge';

interface SubmissionRowProps {
    submission: ContactForm
};

function SubmissionRow({ submission }: SubmissionRowProps) {

    const cellClass = "py-4";
    const createdAt = dayjs(submission.createdAt).format("MMMM D, YYYY");

    return(
        <TableRow className="border-b-muted font-semibold">
            <TableCell className={`${cellClass}`}>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <Link to="/dashboard/contacts/form/item/$submissionId" params={{ submissionId: submission.id }}>
                    <p className="hover:cursor-pointer hover:underline">
                        {submission.firstName + " " + submission.lastName}
                    </p>
                </Link>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <p>{submission.email}</p>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <SubmissionStatusBadge status={submission.status as ContactForm["status"]} size="sm" />
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

export default SubmissionRow;