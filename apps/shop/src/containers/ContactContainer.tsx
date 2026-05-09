"use client"

import type { ContactFormValues } from '@@shop/components/Forms/ContactForm';

import { toast } from 'react-hot-toast'

import { ToastError, ToastSuccess } from '@repo/ui';
import ContactForm from '@@shop/components/Forms/ContactForm';

import { useCreateContactFormSubmission } from '@@shop/api';

function ContactContainer() {

    const { mutateAsync } = useCreateContactFormSubmission();

    const onSubmit = async (values: ContactFormValues) => {
        try {
            await mutateAsync({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                message: values.message
            });

            toast((t) => (
                <ToastSuccess toast={t} message={"Message submitted successfully!"} />
            ));
        }
        catch(error) {
            console.error(error);
            toast((t) => (
                <ToastError toast={t} message={"Unable to submit message"} />
            ));
        }
    };

    return(
        <ContactForm onSubmit={onSubmit} />
    );
};

export default ContactContainer;