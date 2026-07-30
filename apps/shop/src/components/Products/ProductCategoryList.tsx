"use client"

import { Category } from '@repo/entities';

import { FlatList, MotionHover, ScrollLink } from '@repo/ui';
import { useSearchParams } from 'next/navigation';
import { categories } from '@repo/queries';
import { Spinner } from '@@shop/components/Common';
import ProductCategory from './ProductCategory';

function ProductCategoryList() {

    const searchParams = useSearchParams();
    const categorySearch = searchParams.get("filter[category]");

    const scrollToId = "product-listings";

    const query = categories.hooks.useIndexPublic({
        pagination: {
            limit: 10
        }
    });

    const nextPage = () => {
        if(!query.hasNextPage) return;

        query.fetchNextPage();
    };

    return(
        <div className="flex flex-col md:flex-row flex-wrap gap-5 items-center justify-center">
            <MotionHover key={`categories-all`}>
                <ScrollLink
                    to={scrollToId}
                    padding={120}
                    className={`text-center w-60 rounded-xl py-2 hover:cursor-pointer ${!categorySearch ? "bg-primary" : "bg-card-light"}`}
                    onClick={() => {
                        window.history.pushState(null, "", "?");
                    }}
                >
                    <p className={`font-bold text-xl`}>All</p>
                </ScrollLink>
            </MotionHover>
            <FlatList
                keyExtractor={(item: Category) => item.id}
                data={
                    query.data?.pages.flatMap((page) => page.results) ?? []
                }
                renderItem={({ item, key }) => (
                    <ProductCategory 
                        key={key} 
                        category={item}
                        scrollTo={scrollToId}
                        isActive={categorySearch === item.name.toLowerCase()}
                        onClick={() => {
                            const params = new URLSearchParams(searchParams.toString());
                            params.set("filter[category]", item.name.toLowerCase())
                            window.history.pushState(null, "", `?${params.toString()}`);
                        }}
                    />
                )}
                onEndReached={nextPage}
                renderLoading={() => <Spinner />}
                isLoading={query.isLoading || query.isFetching || !query.data}
            />
        </div>
    );
};

export default ProductCategoryList;