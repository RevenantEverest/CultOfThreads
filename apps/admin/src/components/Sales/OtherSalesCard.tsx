import { Card, CardContent } from '@repo/ui';
import { FaDollarSign } from 'react-icons/fa6';

interface OtherSalesCardProps {
    total: number
};

function OtherSalesCard({ total }: OtherSalesCardProps) {

    return(
        <Card className="flex-1">
            <CardContent className="py-5 flex flex-col gap-5">
                <h1 className="font-bold">Uncategorized Sales</h1>
                <div className="flex gap-2 items-center text-4xl font-semibold">
                    <FaDollarSign className="text-primary" />
                    <p className="text-bold">{total.toLocaleString()}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default OtherSalesCard;