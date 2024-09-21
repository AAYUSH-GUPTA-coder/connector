"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatAddress from "@/utils/formatAddress";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";

const query = gql`{
  crossChainMessageSents(first: 5) {
    id
    messageId
    amount
    leverage
    user
    receiver
    destinationChainSelector
    transactionHash
  }
}`;

const url =
  "https://api.studio.thegraph.com/query/89247/connector/version/latest";

type Response = {
  crossChainMessageSents: MessageSent[];
};

type MessageSent = {
  id: string;
  messageId: string;
  amount: number;
  leverage: number;
  user: `0x${string}`;
  receiver: `0x${string}`;
  destinationChainSelector: number;
  transactionHash: `0x${string}`;
};

export default function Transactions() {
  const { data, isFetching, error } = useQuery({
    queryKey: ["data"],
    async queryFn() {
      return await request<Response>(url, query);
    },
  });

  console.log(error, "error");

  if (isFetching) return <p>Loading...</p>;
  if (error)
    return (
      <p className="mx-auto p-3 text-gray-400 font-medium border border-border rounded-lg w-full">
        Failed to fetch transactions
      </p>
    );

  return (
    <section className="container mx-auto">
      {data?.crossChainMessageSents &&
      data?.crossChainMessageSents.length > 0 ? (
        <Table className="bg-transparent text-black dark:text-white border border-gray-300 dark:border-gray-700 transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">Transaction</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Receiver</TableHead>
              <TableHead>Leverage</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.crossChainMessageSents.map((data, index) => (
              <TableRow key={index} className="hover:bg-transparent">
                <TableCell className="text-left">
                  <Link
                    href={`https://arbiscan.io/tx/${data.transactionHash}`}
                    className="flex items-center gap-2"
                    target="_blank"
                  >
                    {formatAddress(data.transactionHash)}
                    <MoveUpRight className="w-4 h-4" />
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`https://arbiscan.io/address/${data.user}`}
                    className="flex items-center gap-2"
                    target="_blank"
                  >
                    {formatAddress(data.user)}
                    <MoveUpRight className="w-4 h-4" />
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`https://arbiscan.io/address/${data.receiver}`}
                    className="flex items-center gap-2"
                    target="_blank"
                  >
                    {formatAddress(data.receiver)}
                    <MoveUpRight className="w-4 h-4" />
                  </Link>
                </TableCell>
                <TableCell>{data.leverage / 10}x</TableCell>
                <TableCell className="text-right">
                  {data.amount / 10 ** 18} wstETH
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="mx-auto p-3 text-gray-400 font-medium border border-border rounded-lg">
          No transactions found
        </p>
      )}
    </section>
  );
}
