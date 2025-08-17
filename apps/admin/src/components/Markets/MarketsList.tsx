import type { MarketWithDetails } from '@repo/supabase';

import {
    Card,
    CardContent,
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from '@repo/ui';
import MarketListItem from './MarketListItem';

interface MarketListProps {
    search?: string,
    markets: MarketWithDetails[]
};

function MarketList({ search, markets }: MarketListProps) {

    const headClass = "bg-card-light font-semibold";

    const marketList = markets.filter((el) => {
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
                            <TableHead className={`${headClass}`}>Name</TableHead>
                            <TableHead className={`${headClass} text-center`}>State</TableHead>
                            <TableHead className={`${headClass} text-right rounded-tr-lg`}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {marketList.sort((a, b) => a.name.localeCompare(b.name)).map((market) => (
                            <MarketListItem key={market.id} market={market} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default MarketList;