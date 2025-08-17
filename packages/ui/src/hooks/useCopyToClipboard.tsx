import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import ToastSuccess from '../components/toasts/ToastSuccess';

function useCopyToClipboard(): { isCopied: boolean, copy: (value: string) => void } {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;

        timeout = setTimeout(() => {
            setCopied(false);
        }, 1500);

        return () => {
            if(timeout) {
                clearTimeout(timeout);
            }
        }
    }, [copied]);

    const copyToClipboard = async (value: string) => {

        const codeSnippet = String(value).replace(/\n$/, '');

        if("clipboard" in navigator) {
            await navigator.clipboard.writeText(codeSnippet);
            setCopied(true);
            toast((t) => (
                <ToastSuccess toast={t} message="Code Snippet Copied!" />
            ));
        }
    };

    return {
        isCopied: copied,
        copy: copyToClipboard 
    }
};

export default useCopyToClipboard;