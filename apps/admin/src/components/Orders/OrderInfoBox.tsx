import type { IconType } from 'react-icons';

import { FaCopy } from 'react-icons/fa6';
import { Button, Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@repo/ui';
import { useCopyToClipboard } from '@repo/ui/hooks';

interface OrderInfoBoxProps {
    title: string,
    content: string,
    icon?: IconType,
    canCopy?: boolean,
    copyOverride?: string
};

export default function OrderInfoBox({ title, content, icon, canCopy, copyOverride }: OrderInfoBoxProps) {

    const Icon = icon;
    const copier = useCopyToClipboard();

    const renderCopyButton = () => (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button colorScheme={"cardLight"} onClick={() => copier.copy(copyOverride ?? content)}>
                        <FaCopy />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="font-semibold">Copy {title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );

    return(
        <div className="flex-1 flex flex-col gap-3 lg:gap-2 w-full">
            <div className="flex items-center gap-2 font-bold text-muted text-sm">
                <p>{title}</p>
                {
                    canCopy &&
                    <div className="flex text-text lg:hidden">
                        {renderCopyButton()}
                    </div>
                }
            </div>
            <div className="flex gap-3 items-center w-full">
                <div className="flex items-center gap-3 shadow rounded-md px-4 py-2 bg-card-light w-full h-10">
                    {Icon && <Icon />}
                    <p>{content}</p>
                </div>
                {
                    canCopy &&
                    <div className="hidden lg:flex">
                        {renderCopyButton()}
                    </div>
                }
            </div>
        </div>
    );
};