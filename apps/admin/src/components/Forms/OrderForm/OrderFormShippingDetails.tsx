import { FaLocationDot } from 'react-icons/fa6';
import { FaShippingFast } from 'react-icons/fa';
import { Card, CardContent, type Theme } from '@repo/ui';

import { withForm } from '@repo/ui/hooks';
import { orderFormOpts } from './orderFormOptions';

export const OrderFormShippingDetails = withForm({
    ...orderFormOpts,
    props: {
        theme: {} as Theme
    },
    render: ({ form, theme }) => (
        <Card>
            <CardContent className="py-8 flex flex-col gap-5">
                <div className="flex items-center gap-5 w-full">
                    <p className="font-bold text-lg">Shipping Details</p>
                </div>
                <div className="w-full flex items-center gap-5">
                    <div className="flex-1">
                        <form.AppField
                            name="shippingAddress"
                            validators={{
                                onChange: ({ value }) => (
                                    value === "" ? "Field is Required" : undefined
                                )
                            }}
                            children={(field) => (
                                <field.TextField label="Shipping Address" type="text" icon={FaLocationDot} theme={theme} />
                            )}
                        />
                    </div>
                </div>
                <div className="w-full flex items-center gap-5">
                    <div className="flex-1">
                        <form.AppField
                            name="trackingNumber"
                            validators={{
                                onChange: ({ value }) => (
                                    value === "" ? "Field is Required" : undefined
                                )
                            }}
                            children={(field) => (
                                <field.TextField label="Tracking Number" type="text" icon={FaShippingFast} theme={theme} />
                            )}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
});