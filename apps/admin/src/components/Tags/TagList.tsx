import type { Tag } from '@repo/supabase';

import {
    Card,
    CardContent,
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from '@repo/ui';
import { FaClock } from 'react-icons/fa6';

import TagListItem from './TagListItem';

interface TagListProps {
    search: string,
    tags: Tag[]
};

function TagList({ search, tags }: TagListProps) {

    const headClass = "bg-card-light font-semibold";

    const tagsList = tags.filter((el) => {
        if(el.name && search) {
            return el.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
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
                            <TableHead className={`${headClass}`}>Tag Name</TableHead>
                            <TableHead className={`${headClass}`}>
                                <div className="flex items-center justify-center gap-2">
                                    <FaClock />
                                    <p>Created At</p>
                                </div>
                            </TableHead>
                            <TableHead className={`${headClass} text-right rounded-tr-lg`}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tagsList.sort((a, b) => a.name.localeCompare(b.name)).map((tag) => (
                            <TagListItem key={tag.id} tag={tag} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default TagList;