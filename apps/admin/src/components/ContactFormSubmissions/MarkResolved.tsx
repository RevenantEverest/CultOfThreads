"use client"

import type { ContactForm } from '@repo/entities';

import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { FaCheckCircle } from 'react-icons/fa';

import { Button, ToastSuccess, ToastError } from '@repo/ui';
import { useAuthStore } from '@@admin/store/auth';

import { contactForm } from '@repo/queries';

interface MarkResolvedProps {
    submission: ContactForm,
    title?: string
};

function MarkResolved({ title, submission }: MarkResolvedProps) {

    const auth = useAuthStore((state) => state.auth);

    const queryClient = useQueryClient();
    const mutation = contactForm.hooks.useUpdate(queryClient);

    const handleMarkResolve = async () => {
        try {
            await mutation.mutateAsync({
                id: submission.id,
                authToken: auth.session?.accessToken ?? "",
                payload: {
                    status: "RESOLVED"
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
        <Button onClick={handleMarkResolve} className="bg-green-700 hover:bg-green-800">
            {title && <p className="font-semibold">{title}</p>}
            <FaCheckCircle />
        </Button>
    );
};

export default MarkResolved;