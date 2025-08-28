import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { Card, CardContent, ToastError } from '@repo/ui';

import { useThemeStore } from '@@admin/store/theme';
import CategorySelect from '@@admin/components/Categories/CategorySelect';

import { categoryApi } from '@repo/supabase';
import { FaTimesCircle } from 'react-icons/fa';


interface CategorySelectContainerProps {
    values: string[],
    onChange: (value: string, isDelete?: boolean) => void
};

function CategorySelectContainer({ values, onChange }: CategorySelectContainerProps) {

    const theme = useThemeStore((state) => state.theme);
    const query = useQuery({
        queryKey: ["categories"],
        queryFn: categoryApi.fetchAll
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
                    categories={query.data ?? []}
                    pCategoryIds={values}
                    onChange={handleCategoryAdd}
                />
            }
            <Card className="bg-card-light border-none flex items-center justify-center py-5 pb-0">
                <CardContent className="flex gap-3 flex-wrap items-center justify-center w-full">
                    {
                        values.map((item) => {
                            const data = query.data ?? [];
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