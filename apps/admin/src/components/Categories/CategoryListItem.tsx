import type { Category } from '@repo/supabase';

import dayjs from 'dayjs';
import {
    TableCell,
    TableRow
} from '@repo/ui';
import RemoveCategory from './RemoveCategory';
import EditCategory from './EditCategory';

interface CategoryListItemProps {
    category: Category
};

function CategoryListItem({ category }: CategoryListItemProps) {

    const cellClass = "py-4";
    const createdAt = dayjs(category.created_at).format("MMMM D, YYYY")

    return(
        <TableRow className="border-b-muted font-semibold">
            <TableCell className={`${cellClass}`}></TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1">
                    <p>{category.name}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="flex items-center gap-1 justify-center">
                    <p>{createdAt}</p>
                </div>
            </TableCell>
            <TableCell className={`${cellClass}`}>
                <div className="h-full w-full flex items-center justify-end gap-2">
                    <EditCategory category={category} />
                    <RemoveCategory category={category} />
                </div>
            </TableCell>
        </TableRow>
    );
};

export default CategoryListItem;