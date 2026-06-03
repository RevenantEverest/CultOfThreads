import { useMutation } from '@tanstack/react-query';
import { type SubmissionPayload, createSubmission } from '~/modules/contactForm/actions';

export function useCreateSubmission() {
    return useMutation({
        mutationFn: (submission: SubmissionPayload) => createSubmission({ payload: submission }),
        onError: (err) => {
            console.error("Error in submit contact form hook: ", err);
        }
    });
};