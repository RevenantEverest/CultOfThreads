import type { 
    EventWithMarket, 
    ProductWithDetails, 
    SaleFull, 
    SaleType 
} from '@repo/supabase';

import { useState } from 'react';
import { useThemeStore } from '@@admin/store/theme';
import { useAppForm } from '@repo/ui/hooks';
import { FaDollarSign } from 'react-icons/fa6';
import validator from 'validator';

import { 
    Button,
    Card, 
    CardContent,
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue
} from '@repo/ui';
import { RichText, DateTimePicker } from '@@admin/components/Common';
import { ProductSelect } from '@@admin/components/Products';
import { EventSelect } from '@@admin/components/Events';
import { FaExchangeAlt } from 'react-icons/fa';

type SaleFormType = "create" | "update";

export type SaleFormValues = (
    Record<
        keyof(
            Pick<
                SaleFull,
                "product_id" |
                "event_id" |
                "sale_price" |
                "sale_type" |
                "purchase_date" |
                "notes"
            >
        ),
        string
    >
);

export type ExtraValues = (
    Record<
        keyof Pick<SaleFull, (
            "market_name" | 
            "original_product_price" |
            "product_name"
        )>,
        string
    >
);

interface SaleFormProps {
    type: SaleFormType,
    products: ProductWithDetails[],
    events: EventWithMarket[],
    initialValues: SaleFormValues & Partial<ExtraValues>,
    onSubmit: (value: SaleFormValues) => Promise<void>
};

function SaleForm({ type, products, events, initialValues, onSubmit }: SaleFormProps) {

    const theme = useThemeStore((state) => state.theme);
    const [customProduct, setCustomProduct] = useState(false);
    const [customEvent, setCustomEvent] = useState(false);

    const form = useAppForm({
        defaultValues: initialValues,
        onSubmit: async ({ value }) => {
            await onSubmit(value);
        }
    });

    const getPriceBySoldType = (product: ProductWithDetails) => {
        switch(form.state.values.sale_type) {
            case "EVENT":
                return product.details?.market_price?.toString() ?? "0";
            case "ONLINE":
                return product.details?.online_price?.toString() ?? "0";
            default: 
                return product.details?.online_price?.toString() ?? "0";
        };
    };

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
                <Card>
                    <CardContent className="py-8 flex flex-col gap-5">
                        <div className="flex gap-5">
                            <div className="flex-1 flex gap-2 items-end">
                                {
                                    !customProduct ?
                                    <div className="flex-1 flex flex-col">
                                        <form.Field
                                            name="product_id"
                                            validators={{
                                                onChange: ({ value }) => (
                                                    value === "" ? "Field is Required" : undefined
                                                )
                                            }}
                                            children={(field) => (
                                                <ProductSelect 
                                                    value={field.state.value} 
                                                    products={products} 
                                                    onChange={(value) => {
                                                        field.handleChange(value);

                                                        const product = products.filter((el) => el.id === value)[0];

                                                        if(!product) return;

                                                        const salePrice = getPriceBySoldType(product);

                                                        form.setFieldValue("sale_price", salePrice);
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>
                                    :
                                    <div className="flex-1">
                                        <form.AppField
                                            name="product_name"
                                            children={(field) => (
                                                <field.TextField label="Product Name" theme={theme} />
                                            )}
                                        />
                                    </div>
                                }
                                <Button size={"icon"} className="mb-1" onClick={() => setCustomProduct(!customProduct)} disableAnimation>
                                    <FaExchangeAlt />
                                </Button>
                            </div>
                            <div className="flex-1 flex items-end gap-2">
                                {
                                    !customEvent ?
                                    <div className="flex-1">
                                        <form.Field
                                            name="event_id"
                                            validators={{
                                                onChange: ({ value }) => (
                                                    value === "" ? "Field is Required" : undefined
                                                )
                                            }}
                                            children={(field) => (
                                                <EventSelect value={field.state.value} events={events} onChange={(value) => field.handleChange(value)} />
                                            )}
                                        />
                                    </div>
                                    :
                                    <div className="flex-1">
                                        <form.AppField
                                            name="market_name"
                                            children={(field) => (
                                                <field.TextField label="Market Name" theme={theme} />
                                            )}
                                        />
                                    </div>
                                }
                                <Button size={"icon"} className="mb-1" onClick={() => setCustomEvent(!customEvent)} disableAnimation>
                                    <FaExchangeAlt />
                                </Button>
                            </div>
                            <div className="flex-1">
                                <form.Field
                                    name="sale_type"
                                    children={(field) => (
                                        <>
                                        <div className="flex items-center mb-1.5 font-bold text-sm gap-2">
                                            <p>Sale Type</p>
                                        </div>
                                        <Select 
                                            value={field.state.value ?? undefined} 
                                            onValueChange={(value) => {
                                                field.handleChange(value as SaleType);

                                                const productId = form.state.values.product_id;
                                                const product = products.filter((el) => el.id === productId)[0];

                                                if(!product) return;

                                                const salePrice = getPriceBySoldType(product);

                                                form.setFieldValue("sale_price", salePrice);
                                            }}
                                        >
                                            <SelectTrigger className="bg-card-light px-2.5 py-2.5 rounded-md font-semibold text-sm w-full">
                                                <SelectValue placeholder="Choose A Type" />
                                            </SelectTrigger>
                                            <SelectContent className="font-semibold">
                                                <SelectItem value={"EVENT"}>
                                                    Event
                                                </SelectItem>
                                                <SelectItem value={"ONLINE"}>
                                                    Online
                                                </SelectItem>
                                                <SelectItem value={"OTHER"}>
                                                    Other
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex-1">
                                <form.AppField
                                    name="sale_price"
                                    validators={{
                                        onChange: ({ value }) =>
                                            validator.isNumeric(value) ? undefined : "Must be a number"
                                    }}
                                    children={(field) => (
                                        <>
                                        <div className="flex items-center pb-2 font-bold text-sm gap-2">
                                            <p>Sale Price</p>
                                        </div>
                                        <field.TextField icon={FaDollarSign} theme={theme} value={field.state.value} />
                                        </>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <p className="font-bold">Purchase Date</p>
                                <div className="flex flex-col gap-5 bg-card-light px-4 rounded-lg pt-6 pb-3">
                                    <form.Field
                                        name="purchase_date"
                                        validators={{
                                            onChange: ({ value }) => {
                                                if(value === "") {
                                                    return "Field Is Required";
                                                }

                                                return;
                                            }
                                        }}
                                        children={(field) => (
                                            <>
                                            <DateTimePicker 
                                                separateTime 
                                                nowButton
                                                value={field.state.value} 
                                                onChange={(value) => field.handleChange(value)}
                                            />
                                            <p className="text-red-600 text-sm">{field.state.meta.errors.join(" ")}</p>
                                            </>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <p className="font-bold mb-1.5">Notes</p>
                            <form.Field
                                name="notes"
                                children={(field) => (
                                    <RichText 
                                        value={JSON.parse(field.state.value)}
                                        onChange={(value) => {
                                            const parsedValue = JSON.stringify(value);
                                            field.setValue(parsedValue);
                                        }} 
                                    />
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>
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

export default SaleForm;