import { TableHeader, TableRow, TableHead } from '@repo/ui';

interface OrdersHeaderProps {
    dataAmount: number
};

function OrdersHeader({ dataAmount }: OrdersHeaderProps) {

    const headClass = "bg-card-light font-semibold";

    return(
        <TableHeader>
            <TableRow className="font-bold border-b-muted hover:bg-transparent!">
                <TableHead className={`${headClass} font-bold w-1/10 rounded-tl-lg`}></TableHead>
                <TableHead className={`${headClass}`}>
                    ID <span className="text-xs text-accent font-semibold">({dataAmount})</span>
                </TableHead>
                <TableHead className={`${headClass} text-center`}>Status</TableHead>
                <TableHead className={`${headClass} text-center`}>Customer Name</TableHead>
                <TableHead className={`${headClass} text-center`}>Amount Total</TableHead>
                <TableHead className={`${headClass} text-right rounded-tr-lg`}>Actions</TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default OrdersHeader;