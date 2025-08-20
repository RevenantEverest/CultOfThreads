import type { Market, MarketDetails } from '@repo/supabase';

import { Card, CardContent } from '@repo/ui';
import { useAppForm } from '@repo/ui/hooks';
import { FileUpload, StateSelect } from '@@admin/components/Common';

import { useThemeStore } from '@@admin/store/theme';
import { supabaseStorageUrl } from '@@admin/constants/urls';

type MarketFormType = "create" | "update";

type MarketValues = (
    Record<
        keyof(
            Pick<
                Market,
                "name"
            > &
            Pick <
                MarketDetails,
                "state"
            >
        ),
        string
    >
);

export interface MarketFormValues extends MarketValues {
    image?: File
};

export interface MarketFormProps {
    type: MarketFormType,
    initialValues: MarketFormValues,
    logoUrl?: string | null,
    onSubmit: (values: MarketFormValues) => Promise<void>,
};

function MarketForm({ type, initialValues, logoUrl, onSubmit }: MarketFormProps) {

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
                    <CardContent className="py-8 flex gap-5">
                        {
                            logoUrl && 
                            <div className="h-35 w-35 overflow-hidden">
                                <img 
                                    className="relative object-cover w-full h-full rounded-lg border-card-light border-4"
                                    src={`${supabaseStorageUrl}/${logoUrl}`} 
                                    alt={initialValues.name}
                                />
                            </div>
                        }
                        <div className="w-full flex-1">
                            <form.AppField
                                name="name"
                                validators={{
                                    onChange: ({ value }) => (
                                        value === "" ? "Field is Required" : undefined
                                    )
                                }}
                                children={(field) => (
                                    <field.TextField label="Market Name" type="text" theme={theme} />
                                )}
                            />
                        </div>
                        <div className="">
                            <form.Field
                                name="state"
                                validators={{
                                    onChange: ({ value }) => (
                                        value === "" ? "Field is Required" : undefined
                                    )
                                }}
                                children={(field) => (
                                    <StateSelect value={field.state.value} onChange={(value) => field.handleChange(value)} />
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full">
                    <CardContent className="py-8 flex flex-col gap-10">
                    <p className="font-bold">Media</p>
                    <div className="flex flex-col gap-12">
                        {/* {
                            (productImages && productImages.length > 0 && onRemoveImage) &&
                            <ProductImages images={productImages} onRemoveImage={onRemoveImage} /> 
                        } */}
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

export default MarketForm;