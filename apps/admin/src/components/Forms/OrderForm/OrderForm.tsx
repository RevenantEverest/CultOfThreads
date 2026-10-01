import type { Order, OrderLineItem } from '@repo/entities';
import { useAppForm } from '@repo/ui/hooks';

import { useThemeStore } from '@@admin/store/theme';
import { orderFormOpts } from './orderFormOptions';
import { OrderFormDetails } from './OrderFormDetails';
import { OrderFormShippingDetails } from './OrderFormShippingDetails';

type OrderFormType = "create" | "update";

type OrderValues = Record<keyof Pick<Order, (
    "customerName" |
    "customerEmail" | 
    "amountSubtotalInCents" |
    "amountTotalInCents" |
    "billingAddress" |
    "shippingAddress" |
    "trackingNumber" |
    "status" |
    "stripeCheckoutSessionId" |
    "stripeTransactionId"
)>, string>;

export type OrderFormValues = OrderValues;

export interface OrderFormProps {
    type: OrderFormType,
    initialValues: OrderFormValues,
    onSubmit: (values: OrderFormValues) => Promise<void>,
    orderLineItems: OrderLineItem[]
};

function OrderForm({ type, initialValues, onSubmit }: OrderFormProps) {

    const theme = useThemeStore((state) => state.theme);
    const form = useAppForm({
        ...orderFormOpts,
        defaultValues: initialValues,
        onSubmit: async ({ value }) => {
            await onSubmit(value);
        }
    });

    return(
        <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();

                form.handleSubmit();
            }}
        >
            <form.AppForm>
                <OrderFormDetails form={form} theme={theme} />
                <OrderFormShippingDetails form={form} theme={theme} />
                <div className="flex justify-end">
                    <form.SubscribeField 
                        theme={theme}
                        label={type.charAt(0).toUpperCase() + type.substring(1)} 
                        className="bg-primary px-10"
                    />
                </div>
            </form.AppForm>
        </form>
    );
};

export default OrderForm;