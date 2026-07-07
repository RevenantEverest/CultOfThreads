import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import { ToastError } from '@repo/ui';
import { AddCategory, CategoriesTable } from '@@admin/components/Categories';
import Search from '@@admin/components/Search';

import { categories } from '@repo/queries';
import { useAuthStore } from '@@admin/store/auth';

function CategoryContainer() {

    const auth = useAuthStore((state) => state.auth);
    
    const [search, setSearch] = useState("");
    const query = categories.hooks.useIndex({
        authToken: auth.session?.accessToken ?? "",
        pagination: {
            limit: 10
        }
    });

    useEffect(() => {
        if(!query.isError) return;

        console.error(query.error);
        toast((t) => (
            <ToastError toast={t} message={"Error fetching Categories"} />
        ));
    }, [query.isError, query.error]);

    const nextPage = () => {
        if(!query.hasNextPage) return;

        query.fetchNextPage();
    };

    return(
        <div className="mt-20 pb-20 flex flex-col items-center justify-center gap-5">
            <div className="flex w-full">
                <div className="w-full">
                    <Search setSearch={setSearch} />
                </div>
                <div className="flex gap-2 w-full justify-end">
                    <AddCategory />
                </div>
            </div>
            <div className="w-full">
                <CategoriesTable
                    categories={
                        query.data?.pages.flatMap((page) => page.results) ?? []
                    } 
                    dataAmount={query.data?.pages[0] && query.data.pages[0].count}
                    search={search} 
                    isLoading={query.isLoading || query.isFetching || !query.data}
                    nextPage={nextPage}
                />
            </div>
        </div>
    );
};

export default CategoryContainer;