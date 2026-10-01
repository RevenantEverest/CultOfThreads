import { TableHeader, TableRow, TableHead } from '@repo/ui'

export default function CartTableHeader() {

    const headClass = "bg-card-light font-semibold text-text";

    return(
        <TableHeader>
            <TableRow className="font-bold border-b-muted hover:bg-transparent!">
                <TableHead className={`${headClass} rounded-tl-lg w-[45%]`}>
                    Product Details
                </TableHead>
                <TableHead className={`${headClass} w-[20%]`}>Quantity</TableHead>
                <TableHead className={`${headClass} text-center w-[15%]`}>Price</TableHead>
                <TableHead className={`${headClass} text-center w-[15%]`}>Total</TableHead>
                <TableHead className={`${headClass} text-right rounded-tr-lg w-[10%]`}></TableHead>
            </TableRow>
        </TableHeader>
    );
};