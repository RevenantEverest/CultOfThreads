import { Card, CardContent } from '@repo/ui';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@repo/ui';

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
];

function ContactsList() {

    const headClass = "bg-card-light";
    const cellClass = "py-4";

    return(
        <Card>
            <CardContent className="py-8">
                <Table>
                    <TableHeader>
                        <TableRow className="font-bold border-b-muted">
                            <TableHead className={`${headClass} font-bold w-1/10 rounded-tl-lg`}>Invoice</TableHead>
                            <TableHead className={`${headClass}`}>Status</TableHead>
                            <TableHead className={`${headClass}`}>Method</TableHead>
                            <TableHead className={`${headClass} text-right rounded-tr-lg`}>Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.invoice} className="border-b-muted font-semibold">
                                <TableCell className={`${cellClass}`}>{invoice.invoice}</TableCell>
                                <TableCell className={`${cellClass}`}>{invoice.paymentStatus}</TableCell>
                                <TableCell className={`${cellClass}`}>{invoice.paymentMethod}</TableCell>
                                <TableCell className={`${cellClass} text-right`}>{invoice.totalAmount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default ContactsList;
  