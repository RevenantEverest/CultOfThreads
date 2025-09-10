import { Link } from '@tanstack/react-router';
import { Button } from '@repo/ui';

import { FaPlus } from 'react-icons/fa6';

function AddContact() {
    return(
        <Link to="/dashboard/contacts/add">
            <Button className="!font-semibold !text-sm text-white bg-card-light hover:bg-card-light">
                <FaPlus />
                Add Contact
            </Button>
        </Link>
    );
};

export default AddContact;