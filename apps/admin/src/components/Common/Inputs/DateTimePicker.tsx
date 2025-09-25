import { useEffect, useState } from 'react';
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
import SeparatedTimePicker from './SeparatedTimePicker';

interface DateTimePickerProps {
    value: string,
    onChange: (value: string) => void,
    separateTime?: boolean,
    nowButton?: boolean
};

const getDateTime = (value: string): { date: Date, time: string } => {
        const date = value ? dayjs(value).toDate() : new Date();
        const time = value ? dayjs(value).format("h:mm A") : "1:00 PM";
        
        return { date, time };
    };

function DateTimePicker({ value, onChange, separateTime, nowButton }: DateTimePickerProps) {

    const [open, setOpen] = useState(false);

    const [dateTime, setDateTime] = useState(getDateTime(value));

    const convertToIsoString = (dValue: Date, tValue: string) => {
        const dateTimeStr = `${dValue.toLocaleDateString()} ${tValue}`;
        return dayjs(dateTimeStr, "M/D/YYYY h:mm A").toISOString();
    };

    const handleDateTimeChange = (dtValue: string | Date) => {

        const currentDateTime = dateTime;

        if(typeof dtValue === "string") {
            currentDateTime.time = dtValue;
        }
        else {
            currentDateTime.date = dtValue;
        }

        const isoString = convertToIsoString(dateTime.date, dateTime.time);

        setDateTime(currentDateTime);
        onChange(isoString);
    };

    useEffect(() => {
        setDateTime(getDateTime(value));
    }, [value]);

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
                            {dateTime.date ? dateTime.date.toLocaleDateString() : "Select date"}
                            <FaChevronDown />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={dateTime.date}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                if(date) {
                                    handleDateTimeChange(date);
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
                <div className="flex gap-3">
                {   separateTime ?
                    <SeparatedTimePicker value={dateTime.time} onChange={handleDateTimeChange} /> 
                    : 
                    <TimePicker value={dateTime.time} onChange={handleDateTimeChange} /> 
                }
                {
                    nowButton &&
                    <Button 
                        size={"sm"} 
                        className="text-xs rounded-full" 
                        onClick={() => onChange(dayjs().toISOString())}
                    >
                        Now
                    </Button>
                }
                </div>
            </div>
        </div>
    );
};

export default DateTimePicker;