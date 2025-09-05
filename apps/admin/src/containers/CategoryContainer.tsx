import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BeatLoader } from 'react-spinners';
import toast from 'react-hot-toast';

import { ToastError } from '@repo/ui';
import { AddCategory, CategoryList } from '@@admin/components/Categories';
import Search from '@@admin/components/Search';

import { useThemeStore } from '@@admin/store/theme';

import { categoryApi } from '@repo/supabase';

function CategoryContainer() {

    const theme = useThemeStore((state) => state.theme);
    
    const [search, setSearch] = useState("");
    const query = useQuery({ 
        queryKey: ["categories"], 
        queryFn: categoryApi.fetchAll
    });

    useEffect(() => {
        if(!query.isError) return;

        console.error(query.error);
        toast((t) => (
            <ToastError toast={t} message={"Error fetching Categories"} />
        ));
    }, [query.isError, query.error]);

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
                {
                    query.isLoading ?
                    <BeatLoader
                        className="flex flex-1 items-center justify-center mt-10"
                        size={15}
                        color={theme.colors.primary}
                    />
                    :
                    <CategoryList search={search} categories={query.data ?? []} />
                }
            </div>
        </div>
    );
};

export default CategoryContainer;