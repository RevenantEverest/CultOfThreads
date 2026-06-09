import type { Market } from '@repo/entities';

import { 
    FlatList,
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@repo/ui';
import { Spinner } from '@@admin/components/Common';

interface MarketSelectProps {
    value: string,
    markets: Market[],
    onChange: (value: string) => void,
    nextPage: () => void,
    isLoading?: boolean
};

function MarketSelect({ value, markets, onChange, nextPage, isLoading }: MarketSelectProps) {

    return(
        <div className="w-full">
            <p className="text-sm font-bold mb-1.5">Market</p>
            <Select 
                value={value ?? undefined} 
                onValueChange={(value) => onChange(value)}
            >
                <SelectTrigger className="bg-card-light px-2.5 py-2.5 rounded-md font-semibold text-sm w-full">
                    <SelectValue placeholder="Choose A Market" />
                </SelectTrigger>
                <SelectContent className="font-semibold">
                    <FlatList
                        keyExtractor={(item: Market) => item.id}
                        data={markets}
                        renderItem={(item: Market, key) => (
                            <SelectItem key={key} value={item.id}>
                                {item.name}
                            </SelectItem>
                        )}
                        onEndReached={nextPage}
                        renderLoading={() => <Spinner />}
                        isLoading={isLoading}
                    />
                </SelectContent>
            </Select>
        </div>
    );
};

export default MarketSelect;