import type { Product } from '@repo/entities';

export type SortType = "Price ASC" | "Price DSC" | "Best Sellers" | "New";

export function sortProducts(sortType: string, products: Product[]): Product[] {

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

export function sortByPriceAsc(products: Product[]): Product[] {
    return products.sort((a, b) => {
        const aPrice = a.details?.onlinePrice ?? 0;
        const bPrice = b.details?.onlinePrice ?? 0;

        return bPrice - aPrice;
    });
};

export function sortByPriceDsc(products: Product[]): Product[] {
    return products.sort((a, b) => {
        const aPrice = a.details?.onlinePrice ?? 0;
        const bPrice = b.details?.onlinePrice ?? 0;

        return aPrice - bPrice;
    });
};

export function sortByTagName(products: Product[], tagName: string): Product[] {
    return products.sort((a, b) => {
        const hasTagName = (product: Product) => 
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