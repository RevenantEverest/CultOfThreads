"use client"

import { useRef } from 'react';
import { FaUser, FaEnvelope, FaPencil } from 'react-icons/fa6';

import { Card, CardContent } from '@repo/ui';

import { useAppForm } from '@repo/ui/hooks';
import { useThemeStore } from '@@shop/store/theme';

export interface ContactFormValues {
    firstName: string,
    lastName: string,
    email: string,
    message: string,
    website: string // honeypot value
};

interface ContactFormProps {
    onSubmit: (values: ContactFormValues) => Promise<void>
};

function ContactForm({ onSubmit }: ContactFormProps) {

    const theme = useThemeStore((state) => state.theme);
    const formLoadedAt = useRef<number>(Date.now());

    const initialValues: ContactFormValues = {
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        website: ""
    };

    const form = useAppForm({
        defaultValues: initialValues,
        onSubmit: async ({ value }) => {

            try {
                const timeOnPage = Date.now() - formLoadedAt.current;
                if(timeOnPage > 3000) {
                    await onSubmit(value);
                }

                form.reset();
            }
            catch(error) {
                console.error(error);
            }
        }
    });

    return(
        <Card className="w-full md:w-8/12">
            <CardContent>
                <form
                    className="flex flex-col gap-8 pt-8"
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        form.handleSubmit();
                    }}
                >
                    <form.AppForm>
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-5">
                                <div className="flex-1">
                                    <form.AppField
                                        name="firstName"
                                        validators={{
                                            onChange: ({ value }) => (
                                                value === "" ? "Field is Required" : undefined
                                            )
                                        }}
                                        children={(field) => (
                                            <field.TextField placeholder="First Name" type="text" theme={theme} icon={FaUser} />
                                        )}
                                    />
                                </div>
                                <div className="flex-1">
                                    <form.AppField
                                        name="lastName"
                                        validators={{
                                            onChange: ({ value }) => (
                                                value === "" ? "Field is Required" : undefined
                                            )
                                        }}
                                        children={(field) => (
                                            <field.TextField placeholder="Last Name" type="text" theme={theme} icon={FaUser} />
                                        )}
                                    />
                                </div>
                            </div>
                            <div>
                                <form.AppField
                                    name="email"
                                    validators={{
                                        onChange: ({ value }) => (
                                            value === "" ? "Field is Required" : undefined
                                        )
                                    }}
                                    children={(field) => (
                                        <field.TextField placeholder="Email" type="text" theme={theme} icon={FaEnvelope} />
                                    )}
                                />
                            </div>
                            <div>
                                <form.AppField
                                    name="message"
                                    validators={{
                                        onChange: ({ value }) => (
                                            value === "" ? "Field is Required" : undefined
                                        )
                                    }}
                                    children={(field) => (
                                        <field.TextAreaField 
                                            placeholder="Write us a message!" 
                                            type="text" 
                                            theme={theme} 
                                            icon={FaPencil}
                                            rows={10}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        {/* Honeypot field */}
                        <div className="absolute -left-249999.75 opacity-0">
                            <form.AppField
                                name="website"
                                children={(field) => (
                                    <field.TextField 
                                        placeholder="Website" 
                                        type="text" 
                                        theme={theme}
                                        aria-hidden="true"
                                        tabIndex={-1}
                                        autoComplete="off"
                                    />
                                )}
                            />
                        </div>
                        <form.SubscribeField theme={theme} label="Send" className="w-full text-card!" />
                    </form.AppForm>
                </form>
            </CardContent>
        </Card>
    );
};

export default ContactForm;