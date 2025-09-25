import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@repo/ui';

interface MinuteTimePickerProps {
    minute: string,
    handleMinuteChange: (value: string) => void
};

function MinuteTimePicker({ minute, handleMinuteChange }: MinuteTimePickerProps) {

    const generateMinuteArray = (): string[] => {
        const times: string[] = [];

        for(let i = 0; i < 60; i++) {
            let value = i.toString();
            if(i < 10) {
                value = `0${i}`;
            }
            times.push(value);
        };

        return times;
    };

    const renderTimes = () => {
        const times = generateMinuteArray();

        return times.map((time) => (
            <SelectItem key={`time-select-${time}`} value={time}>
                {time}
            </SelectItem>
        ));
    };

    return(
        <Select 
            value={minute}
            onValueChange={(value) => handleMinuteChange(value)}
        >
            <SelectTrigger className="bg-card px-2.5 py-2.5 rounded-md font-semibold text-sm w-20">
                <SelectValue placeholder="00" />
            </SelectTrigger>
            <SelectContent className="font-semibold">
                {renderTimes()}
            </SelectContent>
        </Select>
    );
};

export default MinuteTimePicker;