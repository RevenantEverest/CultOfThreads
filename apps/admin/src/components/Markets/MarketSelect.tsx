import type { Market } from '@repo/supabase';

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@repo/ui';

interface MarketSelectProps {
    value: string,
    markets: Market[],
    onChange: (value: string) => void
};

function MarketSelect({ value, markets, onChange }: MarketSelectProps) {

    const renderMarkets = () => {
        return markets.map((market) => (
            <SelectItem key={`market-select-${market.name}`} value={market.id}>
                {market.name}
            </SelectItem>
        ));
    };

    return(
        <div>
            <p className="text-sm font-bold mb-1.5">Market</p>
            <Select 
                value={value ?? undefined} 
                onValueChange={(value) => onChange(value)}
            >
                <SelectTrigger className="bg-card-light px-2.5 py-2.5 rounded-md font-semibold text-sm w-40">
                    <SelectValue placeholder="Choose A Market" />
                </SelectTrigger>
                <SelectContent className="font-semibold">
                    {renderMarkets()}
                </SelectContent>
            </Select>
        </div>
    );
};

export default MarketSelect;