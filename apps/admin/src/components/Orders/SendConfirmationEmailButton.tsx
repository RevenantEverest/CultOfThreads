import { toast } from 'react-hot-toast';
import { FaPaperPlane } from 'react-icons/fa6';
import { Button, ToastSuccess, ToastError } from '@repo/ui';
import { Spinner } from '@@admin/components/Common';

import { useAuthStore } from '@@admin/store/auth';

import { orders } from '@repo/queries';

interface SendConfirmationEmailProps {
    orderId: string
};

export default function SendConfirmationEmail({ orderId }: SendConfirmationEmailProps) {

    const auth = useAuthStore((state) => state.auth);
    const mutation = orders.hooks.useSendConfirmationEmail();

    const sendEmail = async () => {
        try {
            await mutation.mutateAsync({
                id: orderId,
                authToken: auth.session?.accessToken ?? ""
            });

            toast((t) => (
                <ToastSuccess toast={t} message="Confirmation email sent!" />
            ));
        }
        catch(err) {
            console.error(err);
            toast((t) => (
                <ToastError toast={t} message="Failed to send confirmation email" />
            ));
        }
    };
    
    return(
        <div className="flex flex-1 justify-end">
            <div>
                <Button colorScheme={"cardLight"} disabled={mutation.isPending} onClick={sendEmail}>
                    {
                        mutation.isPending ?
                        <Spinner />
                        :
                        <>
                            <FaPaperPlane />
                            Send Confirmation Email
                        </>
                    }
                </Button>
            </div>
        </div>
    );
};