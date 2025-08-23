import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

import { 
    Button, 
    Calendar, 
    Label, 
    Popover, 
    PopoverTrigger, 
    PopoverContent
} from '@repo/ui';
import TimePicker from './TimePicker';
import dayjs from 'dayjs';

interface DateTimePickerProps {
    value: string,
    onChange: (value: string) => void
};

function DateTimePicker({ value, onChange }: DateTimePickerProps) {

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date>(value ? dayjs(value).toDate() : new Date());
    const [timeValue, setTimeValue] = useState(value ? dayjs(value).format("h:mm A") : "1:00 PM");

    const convertToIsoString = (dValue: Date, tValue: string) => {
        const dateTime = `${dValue.toLocaleDateString()} ${tValue}`;
        return dayjs(dateTime, "M/D/YYYY h:mm A").toISOString();
    };

    const handleDateChange = (dateValue: Date) => {
        setDate(dateValue);

        const newDate = convertToIsoString(dateValue, timeValue);
        onChange(newDate);
    };

    const handleTimeChange = (tValue: string) => {
        setTimeValue(timeValue);

        const newDate = convertToIsoString(date, tValue);
        onChange(newDate);
    };

    return(
        <div className="flex gap-4">
            <div className="flex flex-col gap-3">
                <Label htmlFor="date-picker" className="px-1 font-semibold">
                    Date
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild className="border-card-light">
                        <Button
                            colorScheme="card"
                            id="date-picker"
                            className="w-32 justify-between font-normal"
                            disableAnimation={true}
                        >
                            {date ? date.toLocaleDateString() : "Select date"}
                            <FaChevronDown />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                if(date) {
                                    handleDateChange(date);
                                }
                                setOpen(false);
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col gap-3">
                <Label htmlFor="time-picker" className="px-1 font-semibold">
                    Time
                </Label>
                <TimePicker value={timeValue} onChange={handleTimeChange} />
            </div>
        </div>
    );
};

export default DateTimePicker;