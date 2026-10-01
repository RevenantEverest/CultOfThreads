import { Order } from '@repo/entities';
import { Card, CardContent } from '@repo/ui';
import { FaDollarSign } from 'react-icons/fa6';

interface OrderShippingSummaryProps {
    order: Order
};

export default function OrderShippingSummary({ order }: OrderShippingSummaryProps) {

    return(
        <Card>
            <CardContent className="pt-10">
                <div className="flex items-center text-xl font-bold pb-5">
                    <p className="flex-1">Shipping Details</p>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <p className="text-muted font-semibold">Option</p>
                        <div className="bg-card-light px-2 py-2 rounded-lg">
                            <p>{order.shippingOptionName.charAt(0) + order.shippingOptionName.substring(1).toLowerCase()}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-muted font-semibold">Address</p>
                        <div className="bg-card-light px-2 py-2 rounded-lg">
                            <p>{order.shippingAddress}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-muted font-semibold">Shipping Total</p>
                        <div className="flex items-center bg-card-light px-2 py-2 rounded-lg">
                            <FaDollarSign className="text-primary" />
                            <p>{(order.shippingAmountInCents / 100).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};