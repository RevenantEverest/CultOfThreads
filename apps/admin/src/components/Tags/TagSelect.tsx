import type { Tag } from '@repo/entities';

import {
    FlatList,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@repo/ui';
import { Spinner } from '@@admin/components/Common';

interface TagSelectProps {
    tags: Tag[],
    pTagIds: string[],
    onChange: (value: string) => void,
    nextPage: () => void,
    isLoading?: boolean
};

function TagSelect({ tags, pTagIds, onChange, nextPage, isLoading }: TagSelectProps) {

    return(
        <div className="w-full">
            <p className="text-sm font-bold mb-1.5">Tags</p>
            <Select onValueChange={(value) => onChange(value)}>
                <SelectTrigger className="bg-card-light px-2.5 py-2.5 rounded-md font-semibold text-sm w-full">
                    <SelectValue placeholder="Choose A Tag" />
                </SelectTrigger>
                <SelectContent className="font-semibold">
                    <FlatList
                        keyExtractor={(item: Tag) => item.id}
                        data={tags}
                        renderItem={({ item, key }) => (
                            <SelectItem 
                                key={key}
                                value={item.id}
                                disabled={pTagIds.includes(item.id)}
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

export default TagSelect;