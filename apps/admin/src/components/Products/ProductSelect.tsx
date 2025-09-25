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
        return products.sort((a, b) => a.name.localeCompare(b.name)).map((product, index) => (
            <SelectItem key={`product-select-${product.name}-${index}`} value={product.id}>
                {product.name}
            </SelectItem>
        ));
    };

    return(
        <div className="flex flex-col">
            <p className="text-sm font-bold mb-1.5">Product</p>
            <Select 
                value={value ?? undefined} 
                onValueChange={(value) => onChange(value)}
            >
                <SelectTrigger className="bg-card-light px-2.5 py-5 rounded-md font-semibold text-sm w-full">
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