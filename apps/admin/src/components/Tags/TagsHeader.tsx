import { TableHead, TableHeader, TableRow } from '@repo/ui';
import { FaClock } from 'react-icons/fa6';

interface TagsHeaderProps {
    dataAmount: number
};

function TagsHeader({ dataAmount }: TagsHeaderProps) {

    const headClass = "bg-card-light font-semibold";

    return(
        <TableHeader>
            <TableRow className="font-bold border-b-muted hover:bg-transparent!">
                <TableHead className={`${headClass} font-bold w-1/10 rounded-tl-lg`}></TableHead>
                <TableHead className={`${headClass}`}>
                    Tag Name <span className="text-xs text-accent font-semibold">({dataAmount})</span>
                </TableHead>
                <TableHead className={`${headClass}`}>
                    <div className="flex items-center justify-center gap-2">
                        <FaClock />
                        <p>Created At</p>
                    </div>
                </TableHead>
                <TableHead className={`${headClass} text-right rounded-tr-lg`}>Actions</TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default TagsHeader;