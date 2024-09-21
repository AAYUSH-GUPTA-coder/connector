"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";

const query = gql`{
  crossChainMessageSents() {
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
        <Table className="border border-border rounded-xl">
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
              <TableRow key={index}>
                <TableCell className="text-right">
                  {data.transactionHash}
                </TableCell>
                <TableCell>{data.user}</TableCell>
                <TableCell>{data.receiver}</TableCell>
                <TableCell>{data.leverage}</TableCell>
                <TableCell>{data.amount}</TableCell>
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
