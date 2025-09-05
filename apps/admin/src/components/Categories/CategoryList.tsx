import type { Category } from '@repo/supabase';

import {
    Card,
    CardContent,
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from '@repo/ui';

import CategoryListItem from './CategoryListItem';
import { FaClock } from 'react-icons/fa6';

interface CategoryListProps {
    search: string,
    categories: Category[]
};

function CategoryList({ search, categories }: CategoryListProps) {

    const headClass = "bg-card-light font-semibold";

    const categoriesList = categories.filter((el) => {
        if(el.name && search) {
            return el.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }

        return el;        
    });

    return(
        <Card>
            <CardContent className="py-8">
                <Table>
                    <TableHeader>
                        <TableRow className="font-bold border-b-muted hover:!bg-transparent">
                            <TableHead className={`${headClass} font-bold w-1/10 rounded-tl-lg`}></TableHead>
                            <TableHead className={`${headClass}`}>Category Name</TableHead>
                            <TableHead className={`${headClass}`}>
                                <div className="flex items-center justify-center gap-2">
                                    <FaClock />
                                    <p>Created At</p>
                                </div>
                            </TableHead>
                            <TableHead className={`${headClass} text-right rounded-tr-lg`}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categoriesList.sort((a, b) => a.name.localeCompare(b.name)).map((category) => (
                            <CategoryListItem key={category.id} category={category} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default CategoryList;