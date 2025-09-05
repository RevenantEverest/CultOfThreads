import type { Tag } from '@repo/supabase';

import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@repo/ui';

interface TagSelectProps {
    tags: Tag[],
    pTagIds: string[],
    onChange: (value: string) => void 
};

function TagSelect({ tags, pTagIds, onChange }: TagSelectProps) {

    const renderTags = () => {
        return tags.map((tag) => (
            <SelectItem 
                key={`tag-select-${tag.name}`}
                value={tag.id}
                disabled={pTagIds.includes(tag.id)}
            >
                {tag.name}
            </SelectItem>
        ));
    };

    return(
        <div className="w-full">
            <p className="text-sm font-bold mb-1.5">Tags</p>
            <Select onValueChange={(value) => onChange(value)}>
                <SelectTrigger className="bg-card-light px-2.5 py-2.5 rounded-md font-semibold text-sm w-full">
                    <SelectValue placeholder="Choose A Tag" />
                </SelectTrigger>
                <SelectContent className="font-semibold">
                    {renderTags()}
                </SelectContent>
            </Select>
        </div>
    );
};

export default TagSelect;