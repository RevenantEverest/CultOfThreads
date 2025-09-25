import { Link } from '@tanstack/react-router';
import { Button } from '@repo/ui';

import { FaPlus } from 'react-icons/fa6';

function AddSale() {
    return(
        <Link to="/dashboard/sales/add" search={{ productId: "" }}>
            <Button className="!font-semibold !text-sm text-white bg-card-light hover:bg-card-light">
                <FaPlus />
                Add Sale
            </Button>
        </Link>
    );
};

export default AddSale;