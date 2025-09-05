"use client"

import type { NewsletterFormValues } from './Forms/NewsletterForm';

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ToastError, ToastSuccess } from '@repo/ui';
import NewsletterForm from './Forms/NewsletterForm';

import { newsletterApi } from '@repo/supabase';

function isErrorWithMessage(error: unknown): error is { message: string } {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message: unknown }).message === 'string'
    );
};

function Newsletter({ className }: React.HTMLAttributes<HTMLDivElement>) {

    const mutation = useMutation({
        mutationFn: newsletterApi.create
    });

    const onSubmit = async (values: NewsletterFormValues) => {
        try {
            await mutation.mutateAsync({ email: values.email, first_name: values.first_name });
        
            toast((t) => (
                <ToastSuccess toast={t} message={"Newsletter signup successful!"} />
            ));
        }
        catch(error) {
            console.error(error);
            const errorMessage = isErrorWithMessage(error) ? error.message : null;
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