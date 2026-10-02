import type { Order as OrderType } from '@repo/entities';

import { Link } from '@tanstack/react-router';
import { FaEdit, FaShippingFast } from 'react-icons/fa';
import { 
    FaClock, 
    FaDollarSign, 
    FaEnvelope, 
    FaLocationDot, 
    FaNoteSticky, 
    FaRegClock, 
    FaStripeS, 
    FaUser 
} from 'react-icons/fa6';
import dayjs from 'dayjs';

import { 
    Button, 
    Card, 
    CardContent, 
    Table, 
    TableBody, 
    TableHeader,
    TableRow,
    TableHead 
} from '@repo/ui';
import OrderStatusBadge from './OrderStatusBadge';
import OrderInfoBox from './OrderInfoBox';
import OrderLineItem from './OrderLineItem';
import SendTrackingEmailButton from './SendTrackingEmailButton';
import SendConfirmationEmail from './SendConfirmationEmailButton';
import { GoBackButton } from '@@admin/components/Common';

interface OrderProps {
    order: OrderType
};

export default function Order({ order }: OrderProps) {

    const createdAt = dayjs(order.createdAt).format("MMMM D, YYYY h:mma");
    const updatedAt = dayjs(order.updatedAt).format("MMMM D, YYYY h:mma");
    const tokensValidBefore = dayjs(order.tokensValidBefore).format("MMMM D, YYYY h:mma");

    const headClass = "bg-card-light font-semibold";

    const renderLineItems = () => {
        return order.orderLineItems.map((item, index) => (
            <OrderLineItem lineItem={item} index={index} key={item.id} />
        ));
    };

    return(
        <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center">
                <GoBackButton />
                <div className="flex justify-end flex-1 gap-3">
                    <Link to="/dashboard/orders/edit/$orderId" params={{ orderId: order.id }}>
                        <Button colorScheme="cardLight">
                            <FaEdit />
                            Edit
                        </Button>
                    </Link>
                </div>
            </div>
            <Card>
                <CardContent className="flex flex-col items-start gap-5 pb-0 py-5">
                    <div className="flex items-center gap-5 w-full">
                        <p className="font-bold text-lg">Order Details</p>
                        <SendConfirmationEmail orderId={order.id} />
                    </div>
                    <OrderStatusBadge status={order.status} size="sm" />
                    <div className="flex flex-col lg:flex-row gap-5 w-full">
                        <OrderInfoBox title="Name" icon={FaUser} content={order.customerName} />
                        <OrderInfoBox title="Email" icon={FaEnvelope} content={order.customerEmail} canCopy />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-5 w-full">
                        <OrderInfoBox 
                            title="Amount Subtotal" 
                            icon={FaDollarSign} 
                            content={((order.amountSubtotalInCents ?? 0) / 100).toLocaleString()}
                        />
                        <OrderInfoBox 
                            title="Shipping Total" 
                            icon={FaDollarSign} 
                            content={((order.shippingAmountInCents ?? 0) / 100).toLocaleString()}
                        />
                        <OrderInfoBox 
                            title="Tax Collected" 
                            icon={FaDollarSign} 
                            content={((order.taxCollectedInCents ?? 0) / 100).toLocaleString()}
                        />
                        <OrderInfoBox 
                            title="Amount Total" 
                            icon={FaDollarSign} 
                            content={((order.amountTotalInCents ?? 0) / 100).toLocaleString()}
                        />
                    </div>
                    <OrderInfoBox title="Billing Address" icon={FaLocationDot} content={order.billingAddress} canCopy />
                    <OrderInfoBox title="Stripe Transaction ID" icon={FaStripeS} content={order.stripeTransactionId} canCopy />
                    <div className="flex flex-col lg:flex-row w-full gap-5">
                        <OrderInfoBox title="Created At" icon={FaClock} content={createdAt} />
                        <OrderInfoBox title="Last Updated" icon={FaRegClock} content={updatedAt} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="flex flex-col items-start gap-5 pb-0 py-5">
                    <div className="flex w-full">
                        <p className="font-bold text-lg">Shipping Details</p>
                        <SendTrackingEmailButton orderId={order.id} />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-5 w-full">
                        <OrderInfoBox title="Shipping Option" content={order.shippingOptionName} />
                        <OrderInfoBox title="Shipping Option ID" content={order.shippingOptionId} canCopy />
                    </div>
                    <OrderInfoBox title="Shipping Address" icon={FaLocationDot} content={order.shippingAddress} canCopy />
                    <OrderInfoBox title="Tracking Number" icon={FaShippingFast} content={order.trackingNumber} canCopy />
                </CardContent>
            </Card>

            <Card>
                <CardContent className="flex flex-col items-start gap-5 pb-0 py-5">
                    <div className="flex w-full">
                        <p className="font-bold text-lg">Additional Information</p>
                    </div>
                    <OrderInfoBox title="Customer Note" icon={FaNoteSticky} content={order.customerNotes} canCopy />
                    <OrderInfoBox title="Viewing Tokens Valid Before" icon={FaClock} content={tokensValidBefore} />

                </CardContent>
            </Card>

            <Card>
                <CardContent className="flex flex-col items-start gap-5 pb-0 py-5">
                    <div className="flex w-full">
                        <p className="font-bold text-lg">Line Items</p>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow className="font-bold border-b-muted hover:bg-transparent!">
                                <TableHead className={`${headClass} font-bold w-1/10 rounded-tl-lg`}></TableHead>
                                <TableHead className={`${headClass}`}>
                                    Product Name <span className="text-xs text-accent font-semibold">({order.orderLineItems.length})</span>
                                </TableHead>
                                <TableHead className={`${headClass} text-center`}>Quantity</TableHead>
                                <TableHead className={`${headClass} text-center`}>Sale Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {renderLineItems()}

                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};