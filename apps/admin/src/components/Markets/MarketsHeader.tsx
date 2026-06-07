import {
    TableHeader,
    TableRow,
    TableHead
} from '@repo/ui';

interface MarketsHeaderProps {
    dataAmount: number
};

function MarketsHeader({ dataAmount }: MarketsHeaderProps) {

    const headClass = "bg-card-light font-semibold";

    return(
        <TableHeader>
            <TableRow className="font-bold border-b-muted hover:bg-transparent!">
                <TableHead className={`${headClass} font-bold w-1/10 rounded-tl-lg`}></TableHead>
                <TableHead className={`${headClass}`}>
                    Name <span className="text-xs text-accent font-semibold">({dataAmount})</span>
                </TableHead>
                <TableHead className={`${headClass} text-center`}>State</TableHead>
                <TableHead className={`${headClass} text-right rounded-tr-lg`}>Actions</TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default MarketsHeader;