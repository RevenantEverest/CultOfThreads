import type { ProductTagFull } from '@repo/supabase';

interface ProductTagsProps {
    tags: ProductTagFull[]
};

function ProductTags({ tags }: ProductTagsProps) {

    const getBackgroundColor = (tagName: string): string => {
        switch(tagName.toLowerCase()) {
            case "new":
                return "bg-green-600 text-white";
            case "horror":
                return "bg-purple-600 text-white";
            default:
                return "bg-primary text-white";
        }
    };
    
    const renderTags = () => {
        return tags.map((tag) => {
            const tagColor = getBackgroundColor(tag.tag.name);
            return(
                <div key={`product-tags-${tag.id}`} className={`${tagColor} font-bold px-4 py-.5 text-sm rounded-full`}>
                    {tag.tag.name}
                </div>
            );
        });
    };
    
    return(
        <div className="flex gap-2">
            {renderTags()}
        </div>
    );
};

export default ProductTags;