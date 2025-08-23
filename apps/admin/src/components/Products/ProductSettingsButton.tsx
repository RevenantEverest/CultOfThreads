import { Link } from '@tanstack/react-router';
import { FaCogs } from 'react-icons/fa';

import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@repo/ui';

function ProductSettingsButton() {

    return(
        <Tooltip>
            <TooltipTrigger>
                <Link to="/dashboard/products/settings">
                    <Button colorScheme={"cardLight"}>
                        <FaCogs />
                    </Button>
                </Link>
            </TooltipTrigger>
            <TooltipContent>
                <p className="font-semibold">Settings</p>
            </TooltipContent>
        </Tooltip>
    );
};

export default ProductSettingsButton;