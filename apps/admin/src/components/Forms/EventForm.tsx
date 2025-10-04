import type { Event, Market } from '@repo/supabase';

import { FaLongArrowAltRight } from 'react-icons/fa';
import dayjs from 'dayjs';

import { Card, CardContent } from '@repo/ui';
import { useAppForm } from '@repo/ui/hooks';

import { DateTimePicker, FileUpload} from '@@admin/components/Common';
import { EventHourDifference } from '@@admin/components/Events';
import { URLS } from '@@admin/constants';
import { MarketSelect } from '@@admin/components/Markets';

import { useThemeStore } from '@@admin/store/theme';

type EventFormType = "create" | "update";

type EventValues = (
    Record<
        keyof(
            Pick<
                Event,
                "market_id" |
                "address" |
                "date_from" |
                "date_to"
            >
        ),
        string
    >
);

export interface EventFormValues extends EventValues {
    image?: File
};

export interface EventFormProps {
    type: EventFormType,
    markets: Market[],
    initialValues: EventFormValues,
    flyerUrl?: string | null,
    onSubmit: (values: EventFormValues) => Promise<void>,
};

function EventForm({ type, markets, initialValues, flyerUrl, onSubmit }: EventFormProps) {

    const theme = useThemeStore((state) => state.theme);

    const form = useAppForm({
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
                <Card>
                    <CardContent className="py-8 flex flex-col gap-15">
                        <div className="flex flex-col lg:flex-row gap-5">
                            {
                                flyerUrl && 
                                <div className="h-35 w-35 overflow-hidden">
                                    <img 
                                        className="relative object-cover w-full h-full rounded-lg border-card-light border-4"
                                        src={`${URLS.SUPABASE_STORAGE}/${flyerUrl}`} 
                                        alt="event flyer"
                                    />
                                </div>
                            }
                            <div className="w-full flex-1">
                                <form.AppField
                                    name="address"
                                    validators={{
                                        onChange: ({ value }) => (
                                            value === "" ? "Field is Required" : undefined
                                        )
                                    }}
                                    children={(field) => (
                                        <field.TextField label="Address" type="text" theme={theme} />
                                    )}
                                />
                            </div>
                            <div className="w-full lg:w-90">
                                <form.Field
                                    name="market_id"
                                    validators={{
                                        onChange: ({ value }) => (
                                            value === "" ? "Field is Required" : undefined
                                        )
                                    }}
                                    children={(field) => (
                                        <MarketSelect value={field.state.value} markets={markets} onChange={(value) => field.handleChange(value)} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-20 items-center">
                            <div className="flex flex-col flex-1 items-end">
                                <div className="flex flex-col gap-1.5">
                                    <p className="font-bold">Date From</p>
                                    <div className="flex flex-col gap-5 bg-card-light px-4 rounded-lg pt-6 pb-3">
                                        <form.Field
                                            name="date_from"
                                            validators={{
                                                onChangeListenTo: ["date_to"],
                                                onChange: ({ value }) => {
                                                    if(value === "") {
                                                        return "Field Is Required";
                                                    }

                                                    if(dayjs(value).isAfter(form.state.values.date_to)) {
                                                        return "Date cannot be after column: Date To";
                                                    }

                                                    return;
                                                }
                                            }}
                                            children={(field) => (
                                                <>
                                                <DateTimePicker value={field.state.value} onChange={(value) => field.handleChange(value)} />
                                                <p className="text-red-600 text-sm">{field.state.meta.errors.join(" ")}</p>
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center relative">
                                <FaLongArrowAltRight className="text-3xl" />
                                <EventHourDifference />
                            </div>
                            <div className="flex flex-col flex-1 items-end">
                                <div className="flex flex-col gap-1.5">
                                    <p className="font-bold">Date To</p>
                                    <div className="flex flex-col gap-5 bg-card-light px-4 rounded-lg pt-6 pb-3">
                                        <form.Field
                                            name="date_to"
                                            validators={{
                                                onChangeListenTo: ["date_from"],
                                                onChange: ({ value }) => {
                                                    if(value === "") {
                                                        return "Field Is Required";
                                                    }

                                                    if(dayjs(value).isBefore(form.state.values.date_from)) {
                                                        return "Date cannot be before column: Date From";
                                                    }

                                                    return;
                                                }
                                            }}
                                            children={(field) => (
                                                <>
                                                <DateTimePicker value={field.state.value} onChange={(value) => field.handleChange(value)} />
                                                <p className="text-red-600 text-sm">{field.state.meta.errors.join(" ")}</p>
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full">
                    <CardContent className="py-8 flex flex-col gap-10">
                    <p className="font-bold">Flyer</p>
                    <div className="flex flex-col gap-12">
                        <form.Field
                            name="image"
                            children={(field) => (
                                <FileUpload limit={1} onChange={(images: File[]) => field.handleChange(images[0])} />
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

export default EventForm;