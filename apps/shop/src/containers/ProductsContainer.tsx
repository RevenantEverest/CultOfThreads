"use client"

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { ProductList } from '@@shop/components/Products';
import { products as productsQueries } from '@repo/queries';
import qs from 'qs';

function ProductsContainer() {

    const searchParams = useSearchParams();
    const filters = useMemo(() => {
        return qs.parse(searchParams.toString())
    }, [searchParams]);
    const query = productsQueries.hooks.useIndexPublic({
        query: searchParams.toString(),
        filters: filters as Record<string, string>,
        pagination: {
            limit: 10
        }
    });

    const nextPage = () => {
        if(!query.hasNextPage) return;

        query.fetchNextPage();
    };

    return(
        <ProductList
            products={
                query.data?.pages.flatMap((page) => page.results) ?? []
            }
            nextPage={nextPage}
            isLoading={query.isLoading || query.isFetching || !query.data}
        />
    );
};

export default ProductsContainer;