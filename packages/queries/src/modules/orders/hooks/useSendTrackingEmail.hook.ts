import { useMutation } from '@tanstack/react-query';
import { type SendTrackingEmailOptions, sendTrackingEmail } from '~/modules/orders/actions';
import { AxiosError } from 'axios';

export function useSendTrackingEmail() {
    return useMutation({
        mutationFn: (options: SendTrackingEmailOptions) => sendTrackingEmail(options),
        onError: (err) => {
            if(err instanceof AxiosError && err.response) {
                console.error("Backend error response in send tracking email hook: ", err.response.data);
            }
            else {
                console.error("Generic error in send tracking email hook: ", err);
            }
        }
    });
};