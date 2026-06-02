import { useMutation } from '@tanstack/react-query';
import { type SubmissionPayload, createSubmission } from '~/modules/contactForm/actions';

export function useCreateSubmission() {
    return useMutation({
        mutationFn: (submission: SubmissionPayload) => createSubmission({ payload: submission }),
        onError: (error) => {
            console.error("Error submitting form: ", error.message)
        }
    });
};