import { useState } from 'react';
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

dayjs.extend(timezone);
dayjs.extend(utc);

interface TimeValueState {
    time: string,
    meridiemIndicator: string
};

interface TimePickerProps {
    value: string,
    onChange: (value: string) => void
};

/**
 * 
 * @returns Time value in this format: `1:00 PM`
 */
function TimePicker({ value, onChange }: TimePickerProps) {

    const initialValueCharArr = value.split(" ");

    const [timeValue, setTimeValue] = useState<TimeValueState>({
        time: initialValueCharArr[0] ?? `1:00`,
        meridiemIndicator: initialValueCharArr[1] ?? "AM"
    });

    const handleTimeChange = (tValue: string, type: keyof TimeValueState) => {
        const currentTimeValue = timeValue;
        currentTimeValue[type] = tValue;

        setTimeValue(currentTimeValue);
        onChange(`${currentTimeValue.time} ${currentTimeValue.meridiemIndicator}`);
    };

    const generateTimeArray = (): string[] => {
        const times: string[] = [];

        for(let i = 1; i <= 12; i++) {
            times.push(`${i}:00`);
            for(let x = 15; x < 60; x += 15) {
                times.push(`${i}:${x}`);
            }
        };

        return times;
    };

    const renderTimes = () => {
        const times = generateTimeArray();

        return times.map((time) => (
            <SelectItem key={`time-select-${time}`} value={time}>
                {time}
            </SelectItem>
        ));
    };

    return(
        <div className="flex gap-1">
            <Select 
                value={timeValue.time}
                onValueChange={(tValue) => handleTimeChange(tValue, "time")}
            >
                <SelectTrigger className="bg-card px-2.5 py-2.5 rounded-md font-semibold text-sm w-40">
                    <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent className="font-semibold">
                    {renderTimes()}
                </SelectContent>
            </Select>
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

export default TimePicker;