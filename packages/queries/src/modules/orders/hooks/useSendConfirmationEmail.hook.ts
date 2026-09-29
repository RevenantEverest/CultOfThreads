import { useMutation } from '@tanstack/react-query';
import { type SendConfirmationEmailOptions, sendConfirmationEmail } from '~/modules/orders/actions';
import { AxiosError } from 'axios';

export function useSendConfirmationEmail() {
    return useMutation({
        mutationFn: (options: SendConfirmationEmailOptions) => sendConfirmationEmail(options),
        onError: (err) => {
            if(err instanceof AxiosError && err.response) {
                console.error("Backend error response in send confirmation email hook: ", err.response.data);
            }
            else {
                console.error("Generic error in send confirmation email hook: ", err);
            }
        }
    });
};