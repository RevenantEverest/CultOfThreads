import type { Product } from '@repo/supabase';

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@repo/ui';

interface ProductSelectProps {
    value: string,
    products: Product[],
    onChange: (value: string) => void
};

function ProductSelect({ value, products, onChange }: ProductSelectProps) {

    const renderMarkets = () => {
        return products.sort((a, b) => a.name.localeCompare(b.name)).map((product) => (
            <SelectItem key={`product-select-${product.name}`} value={product.id}>
                {product.name}
            </SelectItem>
        ));
    };

    return(
        <div>
            <p className="text-sm font-bold mb-1.5">Product</p>
            <Select 
                value={value ?? undefined} 
                onValueChange={(value) => onChange(value)}
            >
                <SelectTrigger className="bg-card-light px-2.5 py-2.5 rounded-md font-semibold text-sm w-full">
                    <SelectValue placeholder="Choose A Product" />
                </SelectTrigger>
                <SelectContent className="font-semibold">
                    {renderMarkets()}
                </SelectContent>
            </Select>
        </div>
    );
};

export default ProductSelect;