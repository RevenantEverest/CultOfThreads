import type { SaleFull } from '@repo/supabase';
import { Card, CardContent } from '@repo/ui';
import { FaDollarSign } from 'react-icons/fa6';

interface TotalRevenueCardProps {
    sales: SaleFull[]
};

function TotalRevenueCard({ sales }: TotalRevenueCardProps) {

    return(
        <Card className="flex-1">
            <CardContent className="py-5 flex flex-col gap-5">
                <div>
                    <h1 className="font-bold">Total Revenue</h1>
                </div>
                <div className="flex gap-2 items-center text-4xl font-semibold">
                    <FaDollarSign className="text-primary" />
                    <p className="text-bold">{sales.reduce((acc, item) => acc + item.sale_price, 0).toLocaleString()}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default TotalRevenueCard;