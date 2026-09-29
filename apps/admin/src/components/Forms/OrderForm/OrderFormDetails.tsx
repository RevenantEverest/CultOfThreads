import type { Order } from '@repo/entities';

import { 
    FaDollarSign, 
    FaEnvelope, 
    FaLocationDot, 
    FaStripeS, 
    FaUser 
} from 'react-icons/fa6';
import { Card, CardContent, type Theme } from '@repo/ui';

import { withForm } from '@repo/ui/hooks';
import { orderFormOpts } from './orderFormOptions';
import OrderStatus from './OrderStatus';

export const OrderFormDetails = withForm({
    ...orderFormOpts,
    props: {
        theme: {} as Theme
    },
    render: ({ form, theme }) => (
        <Card>
            <CardContent className="py-8 flex flex-col gap-5">
                <div className="flex items-center gap-5 w-full">
                    <div className="flex-1">
                        <p className="font-bold text-lg">Order Details</p>
                    </div>
                    <div className="flex-1">
                        <form.Field
                            name="status"
                            children={(field) => (
                                <OrderStatus 
                                    value={field.state.value as Order["status"]}
                                    onChange={(value) => field.setValue(value)}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="w-full flex items-center gap-5">
                    <div className="flex-1">
                        <form.AppField
                            name="customerName"
                            validators={{
                                onChange: ({ value }) => (
                                    value === "" ? "Field is Required" : undefined
                                )
                            }}
                            children={(field) => (
                                <field.TextField label="Name" type="text" icon={FaUser} theme={theme} />
                            )}
                        />
                    </div>
                    <div className="flex-1">
                        <form.AppField
                            name="customerEmail"
                            validators={{
                                onChange: ({ value }) => (
                                    value === "" ? "Field is Required" : undefined
                                )
                            }}
                            children={(field) => (
                                <field.TextField label="Email" type="text" icon={FaEnvelope} theme={theme} />
                            )}
                        />
                    </div>
                </div>
                <div className="w-full flex items-center gap-5">
                    <div className="flex-1">
                        <form.AppField
                            name="amountSubtotalInCents"
                            validators={{
                                onChange: ({ value }) => (
                                    value === "" ? "Field is Required" : undefined
                                )
                            }}
                            children={(field) => (
                                <field.TextField label="Amount Subtotal" type="text" icon={FaDollarSign} theme={theme} />
                            )}
                        />
                    </div>
                    <div className="flex-1">
                        <form.AppField
                            name="amountTotalInCents"
                            validators={{
                                onChange: ({ value }) => (
                                    value === "" ? "Field is Required" : undefined
                                )
                            }}
                            children={(field) => (
                                <field.TextField label="Email" type="text" icon={FaDollarSign} theme={theme} />
                            )}
                        />
                    </div>
                </div>
                <div className="w-full flex items-center gap-5">
                    <div className="flex-1">
                        <form.AppField
                            name="billingAddress"
                            validators={{
                                onChange: ({ value }) => (
                                    value === "" ? "Field is Required" : undefined
                                )
                            }}
                            children={(field) => (
                                <field.TextField label="Billing Address" type="text" icon={FaLocationDot} theme={theme} />
                            )}
                        />
                    </div>
                </div>
                <div className="w-full flex items-center gap-5">
                    <div className="flex-1">
                        <form.AppField
                            name="stripeTransactionId"
                            validators={{
                                onChange: ({ value }) => (
                                    value === "" ? "Field is Required" : undefined
                                )
                            }}
                            children={(field) => (
                                <field.TextField label="Stripe Transaction ID" type="text" icon={FaStripeS} theme={theme} />
                            )}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
});