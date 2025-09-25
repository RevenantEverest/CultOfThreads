import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@repo/ui';

interface HourTimePickerProps {
    hour: string,
    handleHourChange: (value: string) => void
};

function HourTimePicker({ hour, handleHourChange }: HourTimePickerProps) {

    const generateHourArray = (): string[] => {
        const times: string[] = [];

        for(let i = 1; i <= 12; i++) {
            times.push(i.toString());
        };

        return times;
    };

    const renderTimes = () => {
        const times = generateHourArray();

        return times.map((time) => (
            <SelectItem key={`time-select-${time}`} value={time}>
                {time}
            </SelectItem>
        ));
    };

    return(
        <Select 
            value={hour}
            onValueChange={(value) => handleHourChange(value)}
        >
            <SelectTrigger className="bg-card px-2.5 py-2.5 rounded-md font-semibold text-sm w-20">
                <SelectValue placeholder="12" />
            </SelectTrigger>
            <SelectContent className="font-semibold">
                {renderTimes()}
            </SelectContent>
        </Select>
    );
};

export default HourTimePicker;