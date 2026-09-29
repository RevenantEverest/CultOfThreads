import { Card, CardContent } from '@repo/ui';
import { FaCartShopping, FaDollarSign } from 'react-icons/fa6';

interface OnlineSalesCardProps {
    total: number
};

function OnlineSalesCard({ total }: OnlineSalesCardProps) {

    return(
        <Card className="flex-1">
            <CardContent className="py-5 flex flex-col gap-5">
                <div className="flex items-center gap-2">
                    <FaCartShopping />
                    <h1 className="font-bold">Online Sales</h1>
                </div>
                <div className="flex gap-2 items-center text-4xl font-semibold">
                    <FaDollarSign className="text-primary" />
                    <p className="text-bold">{total.toLocaleString()}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default OnlineSalesCard;