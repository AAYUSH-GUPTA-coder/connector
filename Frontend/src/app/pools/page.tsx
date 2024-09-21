import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

export default function page() {
  return (
    <section className="container mx-auto my-10">
      <Table className="border border-border rounded-xl">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2 text-lg py-4 px-8">Pools</TableHead>
            <TableHead className="text-lg">Wallet</TableHead>
            <TableHead className="text-lg">Deposited</TableHead>
            <TableHead className="text-lg">APY</TableHead>
            <TableHead className="text-right text-lg px-8">TVL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium text-lg flex items-center gap-2 py-6 px-8">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="font font-medium">wstETH</p>
              </TableCell>
              <TableCell className="text-lg">{invoice.paymentStatus}</TableCell>
              <TableCell className="text-lg">{invoice.paymentMethod}</TableCell>
              <TableCell className="text-lg">{invoice.totalAmount}</TableCell>
              <TableCell className="text-right text-lg px-8">
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
