"use client"

import type { ProductListing } from '@repo/supabase';

import { useEffect, useState } from 'react';

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

        let updatedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));

        switch(value) {
            case "Price ASC":
                updatedProducts = updatedProducts.sort((a, b) => (b.details?.online_price ?? 0) - (a.details?.online_price ?? 0));
                break;
            case "Price DSC": 
                updatedProducts = updatedProducts.sort((a, b) => (a.details?.online_price ?? 0) - (b.details?.online_price ?? 0));
                break;
            case "Best Sellers":
                updatedProducts = updatedProducts.sort((a, b) => {
                    const isBestSeller = (product: ProductListing) => 
                        product.tags?.map(tag => tag.tag.name).includes("Best Seller");

                    const aIsBestSeller = isBestSeller(a);
                    const bIsBestSeller = isBestSeller(b);

                    if (aIsBestSeller && !bIsBestSeller) {
                        return -1;
                    }

                    if (!aIsBestSeller && bIsBestSeller) {
                        return 1;
                    }

                    return 0;
                });
                break;
            case "New":
                updatedProducts = updatedProducts.sort((a, b) => {
                    const isBestSeller = (product: ProductListing) => 
                        product.tags?.map(tag => tag.tag.name).includes("New");

                    const aIsBestSeller = isBestSeller(a);
                    const bIsBestSeller = isBestSeller(b);

                    if (aIsBestSeller && !bIsBestSeller) {
                        return -1;
                    }

                    if (!aIsBestSeller && bIsBestSeller) {
                        return 1;
                    }

                    return 0;
                });
                break;
        };

        setProducts(updatedProducts);
    };

    return(
        <div className="flex items-center justify-center">
            <div className="w-4/12">
                <Search setSearch={setSearch} />
            </div>
            <div className="flex items-center justify-end flex-1 gap-5 relative">
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