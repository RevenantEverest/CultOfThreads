import { Button } from '@repo/ui';
import { Link } from '@tanstack/react-router';

import { FaPlus } from 'react-icons/fa6';

function AddMarket() {

    return(
        <Link to="/dashboard/markets/add">
            <Button className="!font-semibold !text-sm text-white bg-card-light hover:bg-card-light">
                <FaPlus />
                Add Market
            </Button>
        </Link>
    );
};

export default AddMarket;