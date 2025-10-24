import type { SaleFull } from '@repo/supabase';

import { FaClipboardList } from 'react-icons/fa';
import { Card, CardContent } from '@repo/ui';

interface TotalProductsCardProps {
    sales: SaleFull[]
};

function TotalProductsCard({ sales }: TotalProductsCardProps) {

    return(
        <Card className="flex-1">
            <CardContent className="py-5 flex flex-col gap-5">
                <div>
                    <h1 className="font-bold">Total Products Sold</h1>
                </div>
                <div className="flex gap-2 items-center text-4xl font-semibold">
                    <FaClipboardList className="text-accent" />
                    <p className="text-bold">{sales.length.toLocaleString()}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default TotalProductsCard;