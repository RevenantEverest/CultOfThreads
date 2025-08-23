import { useStore } from '@tanstack/react-form';
import { useFormContext } from '@repo/ui/context';
import dayjs from 'dayjs';

function EventHourDifference() {

    const form = useFormContext();
    const dateFrom = useStore(form.store, (state) => state.values["date_from"]);
    const dateTo = useStore(form.store, (state) => state.values["date_to"]);

    const difference = dayjs(dateFrom).diff(dateTo, "hours") * -1;

    return(
        <p className="text-muted font-semibold relative top-4">
            {
                Math.abs(difference) >= 24 ? 
                `${Math.floor(difference / 24)} day(s)`
                : 
                `${difference} hour(s)`}
        </p>
    );
};

export default EventHourDifference;