import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';
import { FaTimesCircle } from 'react-icons/fa';

import { Card, CardContent, ToastError } from '@repo/ui';

import { useThemeStore } from '@@admin/store/theme';
import { TagSelect } from '@@admin/components/Tags';

import { useAuthStore } from '@@admin/store/auth';
import { tags } from '@repo/queries';


interface TagSelectContainerProps {
    values: string[],
    onChange: (value: string, isDelete?: boolean) => void
};

function TagSelectContainer({ values, onChange }: TagSelectContainerProps) {

    const auth = useAuthStore((state) => state.auth);
    const theme = useThemeStore((state) => state.theme);

    const query = tags.hooks.useIndex({
        authToken: auth.session?.accessToken ?? "",
        pagination: {
            limit: 10
        }
    });

    useEffect(() => {
        if(!query.isError) return;

        console.error(query.error);
        toast((t) => (
            <ToastError toast={t} message={"Error fetching tags"} />
        ));
    }, [query.isError, query.error]);

    const handleTagAdd = (value: string) => {
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
                <TagSelect 
                    tags={query.data?.pages.flatMap((page) => page.results) ?? []}
                    pTagIds={values}
                    onChange={handleTagAdd}
                    nextPage={nextPage}
                    isLoading={query.isLoading || query.isFetching || !query.data}
                />
            }
            <Card className="bg-card-light border-none flex items-center justify-center py-5 pb-0">
                <CardContent className="flex gap-3 flex-wrap items-center justify-center w-full">
                    {
                        values.map((item) => {
                            const data = query.data?.pages.flatMap((page) => page.results) ?? [];
                            const tag = data.filter((c) => c.id === item);

                            return(
                                <div
                                    key={`pc-display-${item}`}
                                    className={`
                                        bg-card font-bold rounded-full w-full py-1 text-center text-sm relative group 
                                    `}
                                >
                                    <p>
                                        {tag[0] ? tag[0].name : "Undefined"}
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

export default TagSelectContainer;