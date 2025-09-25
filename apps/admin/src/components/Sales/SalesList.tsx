import type { SaleFull } from '@repo/supabase';

import {
    Card,
    CardContent,
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from '@repo/ui';
import SalesListItem from './SalesListItem';

interface SalesListProps {
    search?: string,
    sales: SaleFull[]
};

function SalesList({ search, sales }: SalesListProps) {

    const headClass = "bg-card-light font-semibold";

    const eventList = sales.filter((el) => {
        if(el.product_name && search) {
            return el.product_name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
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
                            <TableHead className={`${headClass}`}>
                                Product Name <span className="text-xs text-accent font-semibold">({sales.length})</span>
                            </TableHead>
                            <TableHead className={`${headClass} text-center`}>Original Price</TableHead>
                            <TableHead className={`${headClass} text-center`}>Sale Price</TableHead>
                            <TableHead className={`${headClass} text-center`}>Purchase Date</TableHead>
                            <TableHead className={`${headClass} text-center`}>Type</TableHead>
                            <TableHead className={`${headClass} text-center`}>Market Name</TableHead>
                            <TableHead className={`${headClass} text-right rounded-tr-lg`}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {eventList.sort((a, b) => b.purchase_date.localeCompare(a.purchase_date)).map((sale) => (
                            <SalesListItem key={sale.id} sale={sale} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default SalesList;