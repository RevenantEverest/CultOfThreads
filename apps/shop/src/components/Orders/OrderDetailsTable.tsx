"use client"

import type { Order, OrderLineItem } from '@repo/entities';

import { Card, CardContent, TableFlatList } from '@repo/ui';
import { Spinner } from '@@shop/components/Common';

import OrderDetailsHeader from './OrderDetailsHeader';
import OrderDetailsRow from './OrderDetailsRow';
import { FaDollarSign } from 'react-icons/fa6';

interface OrderDetailsTableProps {
    order?: Order,
    isLoading?: boolean
};

function OrderDetailsTable({ order, isLoading }: OrderDetailsTableProps) {

    const getTotalLineItemQuantity = () => {
        if(!order?.orderLineItems || order.orderLineItems.length === 0) {
            return 0;
        }

        return order.orderLineItems.map((item) => item.quantity).reduce((acc, curr) => acc += curr);
    };

    return(
        <Card>
            <CardContent className="pt-10">
                <div className="flex items-center text-xl font-bold pb-5">
                    <p className="flex-1">Shopping Cart</p>
                    <p>{getTotalLineItemQuantity().toLocaleString()} Items</p>
                </div>
                <TableFlatList
                    tableClassName="table-fixed"
                    keyExtractor={(item: OrderLineItem) => item.id}
                    data={order?.orderLineItems ?? []}
                    renderHeader={() => (<OrderDetailsHeader />)}
                    renderItem={({ item, key }) => (
                        <OrderDetailsRow
                            key={key}
                            lineItem={item}
                        />
                    )}
                    renderLoading={() => <Spinner />}
                    isLoading={isLoading}
                />
                <div className="flex justify-end">
                    <div className="flex flex-col gap-8 relative w-full lg:w-4/12 text-right">
                        <div className="flex flex-col gap-2 items-end">
                            <div className="flex gap-5">
                                <div className="flex justify-end w-50">
                                    <p className="text-md font-bold">Subtotal</p>
                                </div>
                                <div className="flex items-center">
                                    <FaDollarSign className="text-primary" />
                                    <p>{order?.amountSubtotalInCents.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex gap-5 justify-end">
                                <div className="flex justify-end w-50">
                                    <p className="text-md font-bold">Tax Collected</p>
                                </div>
                                <div className="flex items-center">
                                    <FaDollarSign className="text-primary" />
                                    <p>{order?.taxCollectedInCents.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-5 justify-end">
                            <div className="flex justify-end w-50">
                                <p className="text-2xl font-bold">Total</p>
                            </div>
                            <div className="flex items-center">
                                <FaDollarSign className="text-primary" />
                                <p>{order?.amountTotalInCents.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderDetailsTable;