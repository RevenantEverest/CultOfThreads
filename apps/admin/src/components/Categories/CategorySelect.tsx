import type { Category } from '@repo/entities';

import { 
    FlatList,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@repo/ui';
import { Spinner } from '@@admin/components/Common';

interface CategorySelectProps {
    categories: Category[],
    pCategoryIds: string[],
    onChange: (value: string) => void,
    nextPage: () => void,
    isLoading?: boolean
};

function CategorySelect({ categories, pCategoryIds, onChange, nextPage, isLoading }: CategorySelectProps) {

    return(
        <div className="w-full">
            <p className="text-sm font-bold mb-1.5">Categories</p>
            <Select onValueChange={(value) => onChange(value)}>
                <SelectTrigger className="bg-card-light px-2.5 py-2.5 rounded-md font-semibold text-sm w-full">
                    <SelectValue placeholder="Choose A Category" />
                </SelectTrigger>
                <SelectContent className="font-semibold">
                    <FlatList
                        keyExtractor={(item: Category) => item.id}
                        data={categories}
                        renderItem={({ item, key }) => (
                            <SelectItem 
                                key={key} 
                                value={item.id}
                                disabled={pCategoryIds.includes(item.id)}
                            >
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

export default CategorySelect;