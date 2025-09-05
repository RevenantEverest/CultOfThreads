import type { Category } from '@repo/supabase';

import { Card, CardContent } from '@repo/ui';
import { useAppForm } from '@repo/ui/hooks';

import { useThemeStore } from '@@admin/store/theme';

type CategoryFormType = "create" | "update";

export type CategoryFormValues = Record<keyof Pick<Category, "name">, string>;

export interface CategoryFormProps {
    type: CategoryFormType,
    initialValues: CategoryFormValues,
    onSubmit: (values: CategoryFormValues) => Promise<void>,
};

function CategoryForm({ type, initialValues, onSubmit }: CategoryFormProps) {

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
                    <CardContent className="py-8 flex flex-col gap-5">
                        <div className="w-full flex-1 flex flex-col gap-10">
                            <h1 className="font-bold text-center text-3xl">{type.charAt(0).toUpperCase() + type.substring(1)} Category</h1>
                            <div>
                            <form.AppField
                                name="name"
                                validators={{
                                    onChange: ({ value }) => (
                                        value === "" ? "Field is Required" : undefined
                                    )
                                }}
                                children={(field) => (
                                    <field.TextField label="Name" type="text" theme={theme} />
                                )}
                            />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <form.SubscribeField 
                                theme={theme}
                                label={type.charAt(0).toUpperCase() + type.substring(1)} 
                                className="bg-primary px-10"
                            />
                        </div>
                    </CardContent>
                </Card>
            </form.AppForm>
        </form>
    );
};

export default CategoryForm;