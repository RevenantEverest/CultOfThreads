import type { Contact } from '@repo/supabase';

import { FaEnvelope, FaLocationDot, FaPhone, FaUser } from 'react-icons/fa6';
import validator from 'validator';

import { useAppForm } from '@repo/ui/hooks';
import { useThemeStore } from '@@admin/store/theme';

import { Card, CardContent } from '@repo/ui';

type ContactFormType = "create" | "update";

export type ContactFormValues = (
    Record<
        keyof(
            Pick<
                Contact,
                "first_name" |
                "last_name" |
                "email" |
                "phone" |
                "address"
            >
        ),
        string
    >
);

interface ContactFormProps {
    type: ContactFormType,
    initialValues: ContactFormValues,
    onSubmit: (values: ContactFormValues) => Promise<void>
};

function ContactForm({ type, initialValues, onSubmit }: ContactFormProps) {

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
                        <div className="flex gap-3">
                            <div className="w-full flex-1">
                                <form.AppField
                                    name="first_name"
                                    children={(field) => (
                                        <field.TextField label="First Name" type="text" icon={FaUser} theme={theme} />
                                    )}
                                />
                            </div>
                            <div className="w-full flex-1">
                                <form.AppField
                                    name="last_name"
                                    children={(field) => (
                                        <field.TextField label="Last Name" type="text" icon={FaUser} theme={theme} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="w-full flex-1">
                            <form.AppField
                                name="email"
                                validators={{
                                    onChange: ({ value }) => (
                                        value !== "" && !validator.isEmail(value) ? "Field is not a valid email" : undefined
                                    )
                                }}
                                children={(field) => (
                                    <field.TextField label="Email" type="text" icon={FaEnvelope} theme={theme} />
                                )}
                            />
                        </div>
                        <div className="w-full flex-1">
                            <form.AppField
                                name="phone"
                                validators={{
                                    onChange: ({ value }) => (
                                        value !== "" && !validator.isMobilePhone(value) ? "Field is not a valid phone number" : undefined
                                    )
                                }}
                                children={(field) => (
                                    <field.TextField label="Phone" type="text" icon={FaPhone} theme={theme} />
                                )}
                            />
                        </div>
                        <div className="w-full flex-1">
                            <form.AppField
                                name="address"
                                children={(field) => (
                                    <field.TextField label="Address" type="text" icon={FaLocationDot} theme={theme} />
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

export default ContactForm;