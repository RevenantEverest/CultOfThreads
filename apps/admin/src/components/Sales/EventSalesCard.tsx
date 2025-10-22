import type { SaleFull } from '@repo/supabase';
import { Card, CardContent } from '@repo/ui';
import { FaDollarSign, FaShop } from 'react-icons/fa6';

interface EventSalesCardProps {
    sales: SaleFull[]
};

function EventSalesCard({ sales }: EventSalesCardProps) {

    return(
        <Card className="flex-1">
            <CardContent className="py-5 flex flex-col gap-5">
                <div className="flex items-center gap-2">
                    <FaShop />
                    <h1 className="font-bold">Event Sales</h1>
                </div>
                <div className="flex gap-2 items-center text-4xl font-semibold">
                    <FaDollarSign className="text-primary" />
                    <p className="text-bold">{sales.reduce((acc, item) => acc + item.sale_price, 0).toLocaleString()}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default EventSalesCard;