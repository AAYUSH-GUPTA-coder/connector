"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WST_ETH_ARBITRUM } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { formatEther } from "viem";
import { useAccount, useReadContract } from "wagmi";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
];

export default function page() {
  const { address } = useAccount();
  const router = useRouter();
  const { data, error } = useReadContract({
    address: WST_ETH_ARBITRUM,
    abi: [
      {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
      },
    ],
    functionName: "balanceOf",
    args: [address],
  });

  return (
    <section className="container mx-auto my-10">
      <Table className="bg-transparent text-black dark:text-white border border-gray-300 dark:border-gray-700 transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2 text-lg py-4 px-8">Pools</TableHead>
            <TableHead className="text-lg">Wallet balance</TableHead>
            <TableHead className="text-lg">Deposited</TableHead>
            <TableHead className="text-lg">APY</TableHead>
            <TableHead className="text-right text-lg px-8">TVL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow
              key={invoice.invoice}
              onClick={() => {
                router.push("/dashboard");
              }}
              className="cursor-pointer"
            >
              <TableCell className="font-medium text-lg flex items-center gap-2 py-6 px-8">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://s2.coinmarketcap.com/static/img/coins/200x200/12409.png" />
                  <AvatarFallback>wstETH</AvatarFallback>
                </Avatar>
                <p className="font font-medium">wstETH</p>
              </TableCell>
              <TableCell className="text-lg">
                {data ? parseFloat(formatEther(data)).toFixed(5) : null}
              </TableCell>
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
