import type { Product, ProductDetails, ProductMedia } from '@repo/supabase';

import { FaShop, FaCartShopping, FaDollarSign } from 'react-icons/fa6';
import validator from 'validator';
import { Card, CardContent } from '@repo/ui';
import { useAppForm } from '@repo/ui/hooks';

import { useThemeStore } from '@@admin/store/theme';
import { FileUpload, RichText } from '@@admin/components/Common';

import ProductStatus from './ProductStatus';
import ProductImages from './ProductImages';

type ProductFormType = "create" | "update";

type ProductValues = (
    Record<
        keyof (
            Pick<
                Product,
                "name" |
                "description"
            > &
            Pick<
                ProductDetails,
                "market_price" |
                "online_price" |
                "status" |
                "weight_grams" |
                "etsy_listing"
            >
        ), 
        string
    >
);

export interface ProductFormValues extends ProductValues {
    images: File[]
};

export interface ProductFormProps {
    type: ProductFormType,
    initialValues: ProductFormValues,
    onSubmit: (values: ProductFormValues) => void,
    productImages?: ProductMedia[],
    onRemoveImage?: (image: ProductMedia) => void
};

function ProductForm({ type, initialValues, productImages, onSubmit, onRemoveImage }: ProductFormProps) {

    const theme = useThemeStore((state) => state.theme);
    const form = useAppForm({
        defaultValues: initialValues,
        onSubmit: async ({ value }) => {
            onSubmit(value);
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
                <Card className="w-full">
                    <CardContent className="py-8">
                        <div className="w-full flex flex-col items-center justify-center gap-8">
                            <div className="w-full flex items-center gap-5">
                                <div className="flex-1">
                                <form.AppField
                                    name="name"
                                    validators={{
                                        onChange: ({ value }) => (
                                            value === "" ? "Field is Required" : undefined
                                        )
                                    }}
                                    children={(field) => (
                                        <field.TextField label="Product Name" type="text" theme={theme} />
                                    )}
                                />
                                </div>
                                <form.Field
                                    name="status"
                                    children={(field) => (
                                        <ProductStatus 
                                            value={field.state.value}
                                            onChange={(value) => field.setValue(value)}
                                        />
                                    )}
                                />
                            </div>
                            <div className="w-full">
                                <form.Field
                                    name="description"
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
                            <div className="w-full">
                                <form.AppField
                                    name="etsy_listing"
                                    validators={{
                                        onChange: ({ value }) => {
                                            if(value !== "" && !validator.isURL(value)) {
                                                return "Value is not a valid URL";
                                            }
                                            
                                            return undefined;
                                        }
                                    }}
                                    children={(field) => (
                                        <field.TextField label="Etsy Listing URL" type="text" theme={theme} />
                                    )}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full">
                    <CardContent className="py-8 flex flex-col gap-10">
                    <p className="font-bold">Pricing</p>
                    <div className="w-full flex gap-5">
                        <div className="flex-1">
                            <form.AppField
                                name="market_price"
                                validators={{
                                    onChange: ({ value }) =>
                                        validator.isNumeric(value) ? undefined : "Must be a number"
                                }}
                                children={(field) => (
                                    <>
                                    <div className="flex items-center pb-2 font-bold text-sm gap-2">
                                        <FaShop className="text-lg" />
                                        <p>Market Price</p>
                                    </div>
                                    <field.TextField icon={FaDollarSign} theme={theme} />
                                    </>
                                )}
                            />
                        </div>
                        <div className="flex-1">
                            <form.AppField
                                name="online_price"
                                validators={{
                                    onChange: ({ value }) =>
                                        validator.isNumeric(value) ? undefined : "Must be a number"
                                }}
                                children={(field) => (
                                    <>
                                    <div className="flex items-center pb-2 font-bold text-sm gap-2">
                                        <FaCartShopping className="text-lg" />
                                        <p>Online Price</p>
                                    </div>
                                    <field.TextField icon={FaDollarSign} theme={theme} />
                                    </>
                                )}
                            />
                        </div>
                    </div>
                    </CardContent>
                </Card>
                <Card className="w-full">
                    <CardContent className="py-8 flex flex-col gap-10">
                    <p className="font-bold">Media</p>
                    <div className="flex flex-col gap-12">
                        {
                            (productImages && productImages.length > 0 && onRemoveImage) &&
                            <ProductImages images={productImages} onRemoveImage={onRemoveImage} /> 
                        }
                        <form.Field
                            name="images"
                            children={(field) => (
                                <FileUpload onChange={(images: File[]) => field.handleChange(images)} />
                            )}
                        />
                    </div>
                    </CardContent>
                </Card>
                <div className="flex justify-end">
                    <form.SubscribeField 
                        label={type.charAt(0).toUpperCase() + type.substring(1)} 
                        className="bg-primary px-10"
                    />
                </div>
            </form.AppForm>
        </form>
            
    );
};

export default ProductForm;