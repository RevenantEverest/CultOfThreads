import { useEffect, useState } from 'react';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@repo/ui';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import HourTimePicker from './HourTimePicker';
import MinuteTimePicker from './MinuteTimePicker';

dayjs.extend(timezone);
dayjs.extend(utc);

interface SeparatedTimeValueState {
    hour: string,
    minute: string,
    meridiemIndicator: string
};

interface SeparatedTimePickerProps {
    value: string,
    onChange: (value: string) => void
};

/**
 * 
 * @returns Time value in this format: `1:00 PM`
 */
function SeparatedTimePicker({ value, onChange }: SeparatedTimePickerProps) {

    const initialValueCharArr = value.split(" ");

    const minuteHourArr = initialValueCharArr[0]?.split(":") ?? ["12", "00"];
    const hour = minuteHourArr[0] ?? "12";
    const minute = minuteHourArr[1] ?? "00";
    const meridiemIndicator = initialValueCharArr[1] ?? "AM";

    const [timeValue, setTimeValue] = useState<SeparatedTimeValueState>({
        hour, minute, meridiemIndicator
    });

    const handleTimeChange = (tValue: string, type: "hour" | "minute" | "meridiemIndicator") => {
        const currentTimeValue = timeValue;

        currentTimeValue[type] = tValue;

        setTimeValue(currentTimeValue);
        onChange(`${currentTimeValue.hour}:${currentTimeValue.minute} ${currentTimeValue.meridiemIndicator}`);
    };

    useEffect(() => {
        console.log("Updating Time => ");
        setTimeValue({
            hour, minute, meridiemIndicator 
        });
    }, [value, hour, minute, meridiemIndicator]);

    return(
        <div className="flex gap-1">
            <HourTimePicker hour={timeValue.hour} handleHourChange={(hValue) => handleTimeChange(hValue, "hour")} />
            <MinuteTimePicker minute={timeValue.minute} handleMinuteChange={(mValue) => handleTimeChange(mValue, "minute")} />
            <Select 
                value={timeValue.meridiemIndicator}
                onValueChange={(tValue) => handleTimeChange(tValue, "meridiemIndicator")}
            >
                <SelectTrigger className="bg-card px-2.5 py-2.5 rounded-md font-semibold text-sm">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="font-semibold">
                    <SelectItem value="AM">
                        AM
                    </SelectItem>
                    <SelectItem value="PM">
                        PM
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SeparatedTimePicker;