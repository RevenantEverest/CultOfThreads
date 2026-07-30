import type { Tag } from '@repo/entities';

import dayjs from 'dayjs';
import { TableCell, TableRow } from '@repo/ui';
import RemoveTag from './RemoveTag';
import EditTag from './EditTag';

interface TagsRowProps {
    tag: Tag
};

function TagsRow({ tag }: TagsRowProps) {

    const cellClass = "py-4";
    const createdAt = dayjs(tag.createdAt).format("MMMM D, YYYY")

    return(
        <TableRow className="border-b-muted font-semibold">
            <TableCell className={`${cellClass}`}></TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1">
                    <p>{tag.name}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <p>{createdAt}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="h-full w-full flex items-center justify-end gap-2">
                    <EditTag tag={tag} />
                    <RemoveTag tag={tag} />
                </div>
            </TableCell>
        </TableRow>
    );
};

export default TagsRow;