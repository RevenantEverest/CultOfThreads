import type { ProductWithDetails } from '@@admin/api/products';

import {
    Card,
    CardContent,
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from '@repo/ui';
import ProductListItem from './ProductListItem';

interface ProductsListProps {
    search?: string,
    products: ProductWithDetails[]
};

function ProductsList({ search, products }: ProductsListProps) {

    const headClass = "bg-card-light font-semibold";

    const productsList = products.filter((el) => {
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
                            <TableHead className={`${headClass}`}>Name</TableHead>
                            <TableHead className={`${headClass} text-center`}>Status</TableHead>
                            <TableHead className={`${headClass} text-center`}>Online Price</TableHead>
                            <TableHead className={`${headClass} text-center`}>Market Price</TableHead>
                            <TableHead className={`${headClass} text-right rounded-tr-lg`}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productsList.sort((a, b) => a.name.localeCompare(b.name)).map((product) => (
                            <ProductListItem key={product.id} product={product} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default ProductsList;