"use client"

import { 
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from '@repo/ui';

import { FaEnvelope, FaUser } from 'react-icons/fa6';
import { useThemeStore } from '@@shop/store/theme';
import { useAppForm } from '@repo/ui/hooks';

interface NewsletterFormValues {
    first_name: string,
    last_name: string,
    email: string
};

function NewsletterForm() {

    const theme = useThemeStore((state) => state.theme);

    const initialValues: NewsletterFormValues = {
        first_name: "",
        last_name: "",
        email: ""
    };

    const form = useAppForm({
        defaultValues: initialValues,
        onSubmit: async () => {

        }
    });

    return(
        <Card className="flex flex-col items-center justify-center bg-transparent border-0 shadow-none w-full">
            <CardHeader className="text-center">
                <CardTitle className="font-obo text-2xl md:text-3xl text-text">Join Our Community</CardTitle>
                <CardDescription className="font-semibold text-muted text-lg">
                    Stay updated with exclusive offers, tips and upcoming events!
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-10 py-10 md:w-8/12 w-full">
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
                            <div className="flex gap-5">
                                <div className="flex-1">
                                    <form.AppField
                                        name="first_name"
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
                                        name="last_name"
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
                        </div>
                        <form.SubscribeField theme={theme} label="Subscribe" className="w-full py-5.5 text-md !text-card" />
                    </form.AppForm>
                </form>
            </CardContent>
        </Card>
    );
};

export default NewsletterForm;