"use client"

import type { ContactForm } from '@repo/entities';

import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { HiDotsHorizontal } from 'react-icons/hi';

import { Button, ToastSuccess, ToastError } from '@repo/ui';
import { useAuthStore } from '@@admin/store/auth';

import { contactForm } from '@repo/queries';


interface MarkPendingProps {
    submission: ContactForm,
    title?: string
};

function MarkPending({ title, submission }: MarkPendingProps) {

    const auth = useAuthStore((state) => state.auth);

    const queryClient = useQueryClient();
    const mutation = contactForm.hooks.useUpdate(queryClient);

    const handleMarkPending = async () => {
        try {
            await mutation.mutateAsync({
                id: submission.id,
                authToken: auth.session?.accessToken ?? "",
                payload: {
                    status: "PENDING"
                }
            });

            toast((t) => (
                <ToastSuccess toast={t} message={"Submission updated!"} />
            ));
        }
        catch {
            toast((t) => (
                <ToastError toast={t} message={"Error updating submission"} />
            ));
        }
    };

    return(
        <Button onClick={handleMarkPending} className="bg-amber-700 hover:bg-amber-800">
            {title && <p className="font-semibold">{title}</p>}
            <HiDotsHorizontal />
        </Button>
    );
};

export default MarkPending;