import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';

import { Card, CardContent, ToastError } from '@repo/ui';

import { useThemeStore } from '@@admin/store/theme';
import CategorySelect from '@@admin/components/Categories/CategorySelect';

import { FaTimesCircle } from 'react-icons/fa';
import { useAuthStore } from '@@admin/store/auth';
import { categories } from '@repo/queries';


interface CategorySelectContainerProps {
    values: string[],
    onChange: (value: string, isDelete?: boolean) => void
};

function CategorySelectContainer({ values, onChange }: CategorySelectContainerProps) {

    const auth = useAuthStore((state) => state.auth);
    const theme = useThemeStore((state) => state.theme);
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
            <ToastError toast={t} message={"Error fetching categories"} />
        ));
    }, [query.isError, query.error]);

    const handleCategoryAdd = (value: string) => {
        onChange(value);
    };

    const nextPage = () => {
        if(!query.hasNextPage) return;

        query.fetchNextPage();
    };

    return(
        <div className="w-full flex flex-col gap-3">
            {
                query.isLoading ?
                <BeatLoader
                    className="flex flex-1 items-center justify-center mt-10"
                    size={15}
                    color={theme.colors.primary}
                />
                :
                <CategorySelect 
                    categories={
                        query.data?.pages.flatMap((page) => page.results) ?? []
                    }
                    pCategoryIds={values}
                    onChange={handleCategoryAdd}
                    nextPage={nextPage}
                    isLoading={query.isLoading || query.isFetching || !query.data}
                />
            }
            <Card className="bg-card-light border-none flex items-center justify-center py-5 pb-0">
                <CardContent className="flex gap-3 flex-wrap items-center justify-center w-full">
                    {
                        values.map((item) => {
                            const data = query.data?.pages.flatMap((page) => page.results) ?? [];
                            const category = data.filter((c) => c.id === item);

                            return(
                                <div
                                    key={`pc-display-${item}`}
                                    className={`
                                        bg-primary font-bold rounded-full w-full py-1 text-center text-sm relative group 
                                    `}
                                >
                                    <p>
                                        {category[0] ? category[0].name : "Undefined"}
                                    </p>
                                    <div 
                                        className="group-hover:block hover:cursor-pointer hidden absolute right-2 top-2 duration-150"
                                        onClick={() => onChange(item, true)}
                                    >
                                        <FaTimesCircle />
                                    </div>
                                </div>
                            );
                        })
                    }
                </CardContent>
            </Card>
        </div>
    );
};

export default CategorySelectContainer;