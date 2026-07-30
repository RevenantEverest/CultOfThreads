import {
    TableHead,
    TableHeader,
    TableRow
} from '@repo/ui';

interface EventsHeaderProps {
    dataAmount: number
};

function EventsHeader({ dataAmount }: EventsHeaderProps) {

    const headClass = "bg-card-light font-semibold";

    return(
        <TableHeader>
            <TableRow className="font-bold border-b-muted hover:bg-transparent!">
                <TableHead className={`${headClass} font-bold w-1/10 rounded-tl-lg`}></TableHead>
                <TableHead className={`${headClass}`}>
                    Market <span className="text-xs text-accent font-semibold">({dataAmount})</span>
                </TableHead>
                <TableHead className={`${headClass} text-center`}>Address</TableHead>
                <TableHead className={`${headClass} text-center`}>Date From</TableHead>
                <TableHead className={`${headClass} text-center`}>Date To</TableHead>
                <TableHead className={`${headClass} text-right rounded-tr-lg`}>Actions</TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default EventsHeader;