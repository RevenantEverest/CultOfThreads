"use client"

import { Category, categoryApi } from '@repo/supabase';
import { useQuery } from '@tanstack/react-query';

import { MotionHover, ScrollLink } from '@repo/ui';
import { useSearchParams } from 'next/navigation';

function ProductCategories() {

    const searchParams = useSearchParams();
    const categorySearch = searchParams.get("category");

    const scrollToId = "product-listings";

    const query = useQuery({
        queryKey: ["categories"],
        queryFn: categoryApi.fetchAll
    });

    const renderCategories = (categories: Category[]) => {
        return categories.sort((a, b) => a.name.localeCompare(b.name)).map((category, index) => {
            return(
                <MotionHover key={`categories-${category.name}-${index}`}>
                    <ScrollLink
                        to={scrollToId}
                        padding={120}
                        className={`text-center w-60 rounded-xl py-2 hover:cursor-pointer ${categorySearch === category.name ? "bg-primary" : "bg-card-light"}`}
                        onClick={() => {
                            const params = new URLSearchParams(searchParams.toString());
                            params.set("category", category.name)
                            window.history.pushState(null, "", `?${params.toString()}`);
                        }}
                    >
                        <p className={`font-bold text-xl`}>{category.name}</p>
                    </ScrollLink>
                </MotionHover>
            );
        });
    };

    return(
        <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
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
            {query.data && renderCategories(query.data)}
        </div>
    );
};

export default ProductCategories;