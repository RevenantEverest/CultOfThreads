import { Button } from '@repo/ui';

import { FaPlus } from 'react-icons/fa6';

function AddContact() {
    return(
        <div>
            <Button className="!font-semibold !text-sm text-text bg-card-light hover:bg-card-light">
                <FaPlus />
                Add Contact
            </Button>
        </div>
    );
};

export default AddContact;