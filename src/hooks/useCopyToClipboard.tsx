import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { ToastSuccess } from '@@components/Common';

function useCopyToClipboard(): [boolean, (value: string) => void] {
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

    return [copied, copyToClipboard]
};

export default useCopyToClipboard;