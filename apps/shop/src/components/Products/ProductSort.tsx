"use client"

import { useSearchParams } from 'next/navigation';

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@repo/ui';

type SortType = "price:ASC" | "price:DESC" | "best seller" | "new";

interface ProductSortProps {
    dataAmount?: number
};

function ProductSort({ dataAmount=0 }: ProductSortProps) {

    const searchParams = useSearchParams();

    const handleSortChange = (value: SortType) => {
        console.log("Changed");
        const params = new URLSearchParams(searchParams.toString());

        if(value === "price:ASC" || value === "price:DESC") {
            if(params.get("filter[tags]")) {
                params.delete("filter[tags]");
            }

            params.set("sort", value);
        }

        if(value === "best seller" || value === "new") {
            params.set("filter[tags]", value);
        }

        window.history.pushState(null, "", `?${params.toString()}`);
    };

    return(
        <div className="flex items-center justify-start md:justify-end flex-1 gap-5 relative">
            <div>
                <p className="font-bold text-sm absolute -top-7">Sort By:</p>
                <Select 
                    onValueChange={(value) => handleSortChange(value as SortType)}
                >
                    <SelectTrigger className="bg-card-light px-2.5 py-2.5 rounded-md font-semibold text-sm w-40">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="font-semibold">
                        <SelectItem value={"best seller"}>
                            Best Sellers
                        </SelectItem>
                        <SelectItem value={"new"}>
                            New
                        </SelectItem>
                        <SelectItem value={"price:ASC"}>
                            Price High to Low
                        </SelectItem>
                        <SelectItem value={"price:DESC"}>
                            Price Low to High
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <p className="text-accent font-bold text-sm">{dataAmount} products</p>
            </div>
        </div>
    );
};

export default ProductSort;