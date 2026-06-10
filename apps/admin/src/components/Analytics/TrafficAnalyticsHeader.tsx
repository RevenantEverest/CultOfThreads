import { TableHeader, TableRow, TableHead } from '@repo/ui';

interface TrafficAnalyticsHeaderProps {
    dataAmount: number
};

function TrafficAnalyticsHeader({ dataAmount }: TrafficAnalyticsHeaderProps) {

    const headClass = "bg-card-light font-semibold";

    return(
        <TableHeader>
            <TableRow className="font-bold border-b-muted hover:bg-transparent!">
                <TableHead className={`${headClass} font-bold w-1/10 rounded-tl-lg`}></TableHead>
                <TableHead className={`${headClass}`}>
                    Campaign <span className="text-xs text-accent font-semibold">({dataAmount})</span>
                </TableHead>
                <TableHead className={`${headClass}`}>Source</TableHead>
                <TableHead className={`${headClass} text-center`}>Landing Page URL</TableHead>
                <TableHead className={`${headClass} text-center`}>Medium</TableHead>
                <TableHead className={`${headClass} text-right rounded-tr-lg`}>Content</TableHead>
                <TableHead className={`${headClass} text-right rounded-tr-lg`}>Created At</TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default TrafficAnalyticsHeader;