"use client"

import type { ProductListing } from '@repo/supabase';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@repo/ui';
import Search from '@@shop/components/Search';

type SortType = "Price ASC" | "Price DSC" | "Best Sellers" | "New";

interface ProductSortProps {
    products: ProductListing[],
    displayedProducts: ProductListing[],
    setProducts: (value: ProductListing[]) => void 
};

function ProductSort({ products, displayedProducts, setProducts }: ProductSortProps) {

    const searchParams = useSearchParams();
    const [search, setSearch] = useState("");
    
    useEffect(() => {
        const updatedProducts = products.filter((el) => {
            if(el.name && search) {
                return el.name.toLowerCase().indexOf(search.trim().toLowerCase()) !== -1;
            }

            return el;        
        });

        setProducts(updatedProducts);
    }, [search, products, setProducts]);

    const handleSortChange = (value: SortType) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", value);
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    return(
        <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center gap-10">
            <div className="w-full md:w-4/12">
                <Search setSearch={setSearch} />
            </div>
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
                            <SelectItem value={"Best Sellers"}>
                                Best Sellers
                            </SelectItem>
                            <SelectItem value={"New"}>
                                New
                            </SelectItem>
                            <SelectItem value={"Price ASC"}>
                                Price High to Low
                            </SelectItem>
                            <SelectItem value={"Price DSC"}>
                                Price Low to High
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <p className="text-accent font-bold text-sm">{displayedProducts.length} products</p>
                </div>
            </div>
        </div>
    );
};

export default ProductSort;