import { useRouter, useCanGoBack } from '@tanstack/react-router';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Button } from '@repo/ui';

export default function GoBackButton() {

    const router = useRouter();
    const canGoBack = useCanGoBack();

    return(
        <>
            {
                canGoBack &&
                <Button colorScheme={"cardLight"} onClick={() => router.history.back()}>
                    <FaLongArrowAltLeft />
                    Go Back
                </Button>   
            }
        </>
    );
};