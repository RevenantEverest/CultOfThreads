import { TableHeader, TableRow, TableHead } from '@repo/ui';

interface SalesHeaderProps {
    dataAmount: number
};

export default function SalesHeader({ dataAmount }: SalesHeaderProps) {

    const headClass = "bg-card-light font-semibold";

    return(
        <TableHeader>
                <TableRow className="font-bold border-b-muted hover:bg-transparent!">
                    <TableHead className={`${headClass} font-bold w-1/10 rounded-tl-lg`}></TableHead>
                    <TableHead className={`${headClass}`}>
                        Product Name <span className="text-xs text-accent font-semibold">({dataAmount})</span>
                    </TableHead>
                    <TableHead className={`${headClass} text-center`}>Original Price</TableHead>
                    <TableHead className={`${headClass} text-center`}>Sale Price</TableHead>
                    <TableHead className={`${headClass} text-center`}>Purchase Date</TableHead>
                    <TableHead className={`${headClass} text-center`}>Type</TableHead>
                    <TableHead className={`${headClass} text-center`}>Market Name</TableHead>
                    <TableHead className={`${headClass} text-right rounded-tr-lg`}>Actions</TableHead>
                </TableRow>
            </TableHeader>
    );
};