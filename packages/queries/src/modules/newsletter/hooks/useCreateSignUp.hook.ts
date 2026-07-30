import { type SignUpPayload, createSignUp } from '~/modules/newsletter/actions';
import { useMutation } from '@tanstack/react-query';

export function useCreateSignUp() {
    return useMutation({
        mutationFn: (signUp: SignUpPayload) => createSignUp({ payload: signUp }),
        onError: (error) => {
            console.error("Error submitting newsletter: ", error.message);
        }
    });
};