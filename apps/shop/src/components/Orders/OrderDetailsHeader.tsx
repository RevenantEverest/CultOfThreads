import { TableHeader, TableRow, TableHead } from '@repo/ui'

export default function OrderDetailsHeader() {

    const headClass = "bg-card-light font-semibold text-text";

    return(
        <TableHeader>
            <TableRow className="font-bold border-b-muted hover:bg-transparent!">
                <TableHead className={`${headClass} rounded-tl-lg w-[45%]`}>
                    Product Details
                </TableHead>
                <TableHead className={`${headClass} w-[10%]`}>Quantity</TableHead>
                <TableHead className={`${headClass} text-center w-[10%]`}>Price</TableHead>
                <TableHead className={`${headClass} text-center w-[10%]`}>Total</TableHead>
            </TableRow>
        </TableHeader>
    );
};