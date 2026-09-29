"use client"

import { useThemeStore } from '@@shop/store/theme';
import { useAppForm } from '@repo/ui/hooks';

export type CustomerNoteFormType = "ADD" | "UPDATE";

export interface CustomerNoteFormValues {
    note: string
};

interface CustomerNoteFormProps {
    type: CustomerNoteFormType,
    initialValues: CustomerNoteFormValues,
    onSubmit: (values: CustomerNoteFormValues) => Promise<void>
};

export default function CustomerNoteForm({ initialValues, type, onSubmit }: CustomerNoteFormProps) {

    const theme = useThemeStore((state) => state.theme);

    const form = useAppForm({
        defaultValues: initialValues,
        onSubmit: async ({ value }) => {
            await onSubmit(value);
        }
    });

    const getSubmitLabel = () => {
        switch(type) {
            case "ADD":
                return "Add Note";
            case "UPDATE":
                return "Update Note";
            default:
                return "Add Note"
        }
    };

    return(
        <form
            className="flex flex-col gap-8"
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();

                form.handleSubmit();
            }}
        >
            <form.AppForm>
                <div className="flex flex-col gap-5">
                    <div>
                        <form.AppField
                            name="note"
                            children={(field) => (
                                <field.TextAreaField 
                                    placeholder="Write us a message!" 
                                    type="text" 
                                    theme={theme} 
                                    rows={10}
                                />
                            )}
                        />
                    </div>
                </div>
                <form.SubscribeField 
                    theme={theme} 
                    label={getSubmitLabel()} 
                    className="w-full text-md text-card!"
                />
            </form.AppForm>
        </form>
    );
};
