import type { Product } from '@repo/entities';

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue,
    FlatList
} from '@repo/ui';
import { Spinner } from '@@admin/components/Common';

interface ProductSelectProps {
    value: string,
    products: Product[],
    onChange: (value: string) => void,
    nextPage: () => void,
    isLoading?: boolean
};

function ProductSelect({ value, products, onChange, nextPage, isLoading }: ProductSelectProps) {

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
                    <FlatList
                        keyExtractor={(item: Product) => item.id}
                        data={products}
                        renderItem={({ item, key }) => (
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

export default ProductSelect;