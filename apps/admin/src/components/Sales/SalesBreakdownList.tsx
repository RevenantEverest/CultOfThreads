import type { ReactNode } from 'react';
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
import SalesBreakdownListItem from './SalesBreakdownListItem';

interface SalesBreakdownListProps {
    breakdownData: Record<string, SaleFull[]>
};

function SalesBreakdownList({ breakdownData }: SalesBreakdownListProps) {

    const headClass = "bg-card-light font-semibold";

    const renderBreakdown = () => {
        const Breakdown: ReactNode[] = [];
        const keys = Object.keys(breakdownData).sort((a, b) => a.localeCompare(b));

        for(let i = 0; i < keys.length; i++) {
            const current = breakdownData[keys[i] as string];

            Breakdown.push((
                <SalesBreakdownListItem 
                    key={`${keys[i]}-breakdown-${i}`}
                    productName={keys[i] as string}
                    sales={current ?? []}
                />
            ));
        };

        return Breakdown;
    };

    return(
        <Card>
            <CardContent className="py-8">
                <Table>
                    <TableHeader>
                        <TableRow className="font-bold border-b-muted hover:!bg-transparent">
                            <TableHead className={`${headClass} font-bold w-1/10 rounded-tl-lg`}></TableHead>
                            <TableHead className={`${headClass}`}>
                                Product Name <span className="text-xs text-accent font-semibold">({Object.keys(breakdownData).length})</span>
                            </TableHead>
                            <TableHead className={`${headClass} text-center`}>Amount Sold</TableHead>
                            <TableHead className={`${headClass} text-center`}>Total Revenue</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {renderBreakdown()}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default SalesBreakdownList;