import type { Category } from '@repo/supabase';

import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@repo/ui';

interface CategorySelectProps {
    categories: Category[],
    pCategoryIds: string[],
    onChange: (value: string) => void 
};

function CategorySelect({ categories, pCategoryIds, onChange }: CategorySelectProps) {

    const renderCategories = () => {
        return categories.map((category) => (
            <SelectItem 
                key={`category-select-${category.name}`}
                value={category.id}
                disabled={pCategoryIds.includes(category.id)}
            >
                {category.name}
            </SelectItem>
        ));
    };

    return(
        <div className="w-full">
            <p className="text-sm font-bold mb-1.5">Categories</p>
            <Select onValueChange={(value) => onChange(value)}>
                <SelectTrigger className="bg-card-light px-2.5 py-2.5 rounded-md font-semibold text-sm w-full">
                    <SelectValue placeholder="Choose A Category" />
                </SelectTrigger>
                <SelectContent className="font-semibold">
                    {renderCategories()}
                </SelectContent>
            </Select>
        </div>
    );
};

export default CategorySelect;