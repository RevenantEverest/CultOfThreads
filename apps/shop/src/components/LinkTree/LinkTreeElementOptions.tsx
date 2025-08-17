import { motion } from 'framer-motion';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { useCopyToClipboard } from '@repo/ui/hooks';
import { Dropdown, DropdownItem } from '@@shop/components/Common';

export interface LinkTreeElementOptionsProps {
    copyContent?: string
};

function LinkTreeElementOptions({ copyContent }: LinkTreeElementOptionsProps) {

    const copyToClipboard = useCopyToClipboard();

    const handleCopy = () => {
        if(copyContent) {
            copyToClipboard.copy(copyContent);
        }
    };

    return(
        <motion.div
            whileHover={{
                y: "-.5vh"
            }}
        >
            <Dropdown
                contentContainerClassName="right-0"
                headerComponent={() => (
                    <FaEllipsisVertical className="text-3xl" />
                )}
            >
                <DropdownItem onClick={handleCopy}>
                    <p className="font-semibold text-sm">Copy Link</p>
                </DropdownItem>
            </Dropdown>
        </motion.div>
    );
};

export default LinkTreeElementOptions;