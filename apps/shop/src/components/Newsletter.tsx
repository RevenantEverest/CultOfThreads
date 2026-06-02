"use client"

import type { NewsletterFormValues } from './Forms/NewsletterForm';

import React from 'react';
import { toast } from 'react-hot-toast';

import { ToastError, ToastSuccess } from '@repo/ui';
import NewsletterForm from './Forms/NewsletterForm';

import { newsletter } from '@repo/queries';
import { errors } from '@@shop/utils';

function Newsletter({ className }: React.HTMLAttributes<HTMLDivElement>) {

    const { mutateAsync } = newsletter.hooks.useCreateSignUp();

    const onSubmit = async (values: NewsletterFormValues) => {
        try {
            await mutateAsync({ email: values.email, firstName: values.first_name });
        
            toast((t) => (
                <ToastSuccess toast={t} message={"Newsletter signup successful!"} />
            ));
        }
        catch(error) {
            const errorMessage = errors.extractErrorMessage(error) ?? null;
            toast((t) => (
                <ToastError toast={t} message={errorMessage ?? "Error signing up for Newsletter"} />
            ));
        }
    };

    return(
        <div className={`${className}`}>
            <NewsletterForm onSubmit={onSubmit} />
        </div>
    );
};

export default Newsletter;