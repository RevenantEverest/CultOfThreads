import type { ProductListing } from '@repo/supabase';

export type SortType = "Price ASC" | "Price DSC" | "Best Sellers" | "New";

export function sortProducts(sortType: string, products: ProductListing[]): ProductListing[] {

    switch(sortType as SortType) {
        case "Price ASC":
            return sortByPriceAsc(products);
        case "Price DSC":
            return sortByPriceDsc(products);
        case "Best Sellers":
            return sortByTagName(products, "Best Seller");
        case "New":
            return sortByTagName(products, "New");
        default: 
            return products;
    };
};

export function sortByPriceAsc(products: ProductListing[]): ProductListing[] {
    return products.sort((a, b) => {
        const aPrice = a.details?.online_price ?? 0;
        const bPrice = b.details?.online_price ?? 0;

        return bPrice - aPrice;
    });
};

export function sortByPriceDsc(products: ProductListing[]): ProductListing[] {
    return products.sort((a, b) => {
        const aPrice = a.details?.online_price ?? 0;
        const bPrice = b.details?.online_price ?? 0;

        return aPrice - bPrice;
    });
};

export function sortByTagName(products: ProductListing[], tagName: string): ProductListing[] {
    return products.sort((a, b) => {
        const hasTagName = (product: ProductListing) => 
            product.tags?.map(tag => tag.tag.name).includes(tagName);

        const aProduct = hasTagName(a);
        const bProduct = hasTagName(b);

        if (aProduct && !bProduct) {
            return -1;
        }

        if (!aProduct && bProduct) {
            return 1;
        }

        return 0;
    });
};