"use client"

import type { ContactFormValues } from '@@shop/components/Forms/ContactForm';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast'

import { ToastError, ToastSuccess } from '@repo/ui';
import ContactForm from '@@shop/components/Forms/ContactForm';

import { contactFormApi } from '@repo/supabase';

function ContactContainer() {

    const mutation = useMutation({
        mutationFn: contactFormApi.create
    });

    const onSubmit = async (values: ContactFormValues) => {
        try {
            await mutation.mutateAsync({
                first_name: values.firstName,
                last_name: values.lastName,
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