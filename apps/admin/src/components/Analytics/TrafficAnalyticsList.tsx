import type { TrafficAnalytics } from '@repo/supabase';

import {
    Card,
    CardContent,
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from '@repo/ui';
import TrafficAnalyticsListItem from './TrafficAnalyticsListItem';

interface TrafficAnalyticsListProps {
    search?: string,
    traffic: TrafficAnalytics[]
};

function TrafficAnalyticsList({ search, traffic }: TrafficAnalyticsListProps) {

    const headClass = "bg-card-light font-semibold";

    const trafficList = traffic.filter((el) => {
        if(search) {
            return el.utm_source.toLowerCase().indexOf(search.toLowerCase()) !== -1;
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
                            <TableHead className={`${headClass}`}>Campaign</TableHead>
                            <TableHead className={`${headClass}`}>Source</TableHead>
                            <TableHead className={`${headClass} text-center`}>Landing Page URL</TableHead>
                            <TableHead className={`${headClass} text-center`}>Medium</TableHead>
                            <TableHead className={`${headClass} text-right rounded-tr-lg`}>Content</TableHead>
                            <TableHead className={`${headClass} text-right rounded-tr-lg`}>Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {trafficList.sort((a, b) => b.created_at.localeCompare(a.created_at)).map((traffic) => (
                            <TrafficAnalyticsListItem key={traffic.id} traffic={traffic} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default TrafficAnalyticsList;