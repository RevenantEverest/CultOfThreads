import { Button } from '@repo/ui';
import { Link } from '@tanstack/react-router';

import { FaPlus } from 'react-icons/fa6';

function AddProduct() {

    return(
        <Link to="/dashboard/products/add">
            <Button className="!font-semibold !text-sm text-white bg-card-light hover:bg-card-light">
                <FaPlus />
                Add Product
            </Button>
        </Link>
    );
};

export default AddProduct;