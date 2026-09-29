import { TableHeader, TableRow, TableHead } from '@repo/ui'

export default function CartTableHeader() {

    const headClass = "bg-card-light font-semibold text-text";

    return(
        <TableHeader>
            <TableRow className="font-bold border-b-muted hover:bg-transparent!">
                <TableHead className={`${headClass} rounded-tl-lg`}>
                    Product Details
                </TableHead>
                <TableHead className={`${headClass}`}>Quantity</TableHead>
                <TableHead className={`${headClass} text-center`}>Price</TableHead>
                <TableHead className={`${headClass} text-center`}>Total</TableHead>
                <TableHead className={`${headClass} text-right rounded-tr-lg`}></TableHead>
            </TableRow>
        </TableHeader>
    );
};