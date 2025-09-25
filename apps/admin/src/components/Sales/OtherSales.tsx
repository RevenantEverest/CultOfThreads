import type { SaleFull } from '@repo/supabase';
import { Card, CardContent } from '@repo/ui';
import { FaDollarSign } from 'react-icons/fa6';

interface OtherSalesProps {
    sales: SaleFull[]
};

function OtherSales({ sales }: OtherSalesProps) {

    return(
        <Card className="flex-1">
            <CardContent className="py-5 flex flex-col gap-5">
                <h1 className="font-bold">Uncategorized Sales</h1>
                <div className="flex gap-2 items-center text-4xl font-semibold">
                    <FaDollarSign className="text-primary" />
                    <p className="text-bold">{sales.reduce((acc, item) => acc + item.sale_price, 0)}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default OtherSales;