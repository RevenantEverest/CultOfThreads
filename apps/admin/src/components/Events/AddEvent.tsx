import { Button } from '@repo/ui';
import { Link } from '@tanstack/react-router';

import { FaPlus } from 'react-icons/fa6';

function AddEvent() {

    return(
        <Link to="/dashboard/events/add">
            <Button className="!font-semibold !text-sm text-white bg-card-light hover:bg-card-light">
                <FaPlus />
                Add Event
            </Button>
        </Link>
    );
};

export default AddEvent;